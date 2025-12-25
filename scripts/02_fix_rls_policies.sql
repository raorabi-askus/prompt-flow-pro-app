-- Fix infinite recursion in team_members RLS policies
-- This script creates helper functions and updates the policies

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view team members of their teams" ON team_members;
DROP POLICY IF EXISTS "Team admins can manage members" ON team_members;

-- Create a security definer function to check team membership
-- This bypasses RLS to prevent infinite recursion
CREATE OR REPLACE FUNCTION is_team_member(p_team_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_id = p_team_id AND user_id = p_user_id
  );
END;
$$;

-- Create a security definer function to check if user is team admin
CREATE OR REPLACE FUNCTION is_team_admin(p_team_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_id = p_team_id AND user_id = p_user_id AND role = 'admin'
  );
END;
$$;

-- Recreate team_members policies using the helper functions
CREATE POLICY "Users can view team members of their teams"
  ON team_members FOR SELECT
  USING (is_team_member(team_id, auth.uid()));

CREATE POLICY "Team admins can manage members"
  ON team_members FOR ALL
  USING (is_team_admin(team_id, auth.uid()));

-- Also fix the teams policy to use the helper function
DROP POLICY IF EXISTS "Users can view teams they are members of" ON teams;

CREATE POLICY "Users can view teams they are members of"
  ON teams FOR SELECT
  USING (
    is_team_member(id, auth.uid()) OR created_by = auth.uid()
  );

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION is_team_member(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_team_admin(UUID, UUID) TO authenticated;
