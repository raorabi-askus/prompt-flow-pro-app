-- ============================================
-- FIX FOR INFINITE RECURSION IN RLS POLICIES
-- ============================================
-- Run this ENTIRE script in your Supabase SQL Editor:
-- https://piqoxajcutqkygixmpik.supabase.co → SQL Editor → New Query → Paste → Run

-- Step 1: Drop ALL existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view team members of their teams" ON team_members;
DROP POLICY IF EXISTS "Team admins can manage members" ON team_members;
DROP POLICY IF EXISTS "Users can view teams they are members of" ON teams;
DROP POLICY IF EXISTS "Users can view categories of their teams" ON categories;
DROP POLICY IF EXISTS "Team members can create categories" ON categories;
DROP POLICY IF EXISTS "Users can view prompts in their teams" ON prompts;
DROP POLICY IF EXISTS "Team members can create prompts" ON prompts;

-- Step 2: Create helper functions with SECURITY DEFINER
-- These bypass RLS to prevent infinite recursion

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

-- Step 3: Grant execute permissions
GRANT EXECUTE ON FUNCTION is_team_member(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_team_admin(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_team_member(UUID, UUID) TO anon;
GRANT EXECUTE ON FUNCTION is_team_admin(UUID, UUID) TO anon;

-- Step 4: Recreate team_members policies using helper functions
CREATE POLICY "Users can view team members of their teams"
  ON team_members FOR SELECT
  USING (is_team_member(team_id, auth.uid()));

CREATE POLICY "Team admins can manage members"
  ON team_members FOR ALL
  USING (is_team_admin(team_id, auth.uid()));

-- Step 5: Recreate teams policy
CREATE POLICY "Users can view teams they are members of"
  ON teams FOR SELECT
  USING (
    is_team_member(id, auth.uid()) OR created_by = auth.uid()
  );

-- Step 6: Recreate categories policies using helper functions
CREATE POLICY "Users can view categories of their teams"
  ON categories FOR SELECT
  USING (
    is_team_member(team_id, auth.uid()) OR is_global = TRUE
  );

CREATE POLICY "Team members can create categories"
  ON categories FOR INSERT
  WITH CHECK (
    is_team_member(team_id, auth.uid())
  );

-- Step 7: Recreate prompts policies using helper functions
CREATE POLICY "Users can view prompts in their teams"
  ON prompts FOR SELECT
  USING (
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Team members can create prompts"
  ON prompts FOR INSERT
  WITH CHECK (
    is_team_member(team_id, auth.uid())
  );

-- Done! All policies now use helper functions to avoid infinite recursion
