-- ============================================
-- COMPLETE FIX FOR ALL DATABASE ISSUES
-- ============================================
-- Run this ENTIRE script in Supabase SQL Editor

-- ============================================
-- PART 1: Add missing foreign key relationship
-- ============================================

-- Add foreign key from team_members.user_id to user_profiles.id
-- First, we need to ensure all team_member user_ids exist in user_profiles

-- Create user_profiles for any users that don't have one yet
INSERT INTO user_profiles (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email),
  COALESCE(au.raw_user_meta_data->>'role', 'member')
FROM auth.users au
WHERE NOT EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = au.id)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PART 2: Fix helper functions for super admin
-- ============================================

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_super BOOLEAN;
BEGIN
  SELECT (raw_user_meta_data->>'is_super_admin')::boolean INTO v_is_super
  FROM auth.users
  WHERE id = p_user_id;
  
  RETURN COALESCE(v_is_super, false);
END;
$$;

GRANT EXECUTE ON FUNCTION is_super_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_super_admin(UUID) TO anon;

-- ============================================
-- PART 3: Drop all existing policies and recreate
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view team members of their teams" ON team_members;
DROP POLICY IF EXISTS "Team admins can manage members" ON team_members;
DROP POLICY IF EXISTS "Users can view teams they are members of" ON teams;
DROP POLICY IF EXISTS "Users can create teams" ON teams;
DROP POLICY IF EXISTS "Users can view categories of their teams" ON categories;
DROP POLICY IF EXISTS "Team members can create categories" ON categories;
DROP POLICY IF EXISTS "Users can view prompts in their teams" ON prompts;
DROP POLICY IF EXISTS "Team members can create prompts" ON prompts;
DROP POLICY IF EXISTS "Users can update their own prompts" ON prompts;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- ============================================
-- PART 4: Create new policies with super admin support
-- ============================================

-- Teams policies
CREATE POLICY "Users can view teams"
  ON teams FOR SELECT
  USING (
    is_super_admin(auth.uid()) OR
    is_team_member(id, auth.uid()) OR 
    created_by = auth.uid()
  );

CREATE POLICY "Users can create teams"
  ON teams FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Super admins can manage all teams"
  ON teams FOR ALL
  USING (is_super_admin(auth.uid()));

-- Team members policies
CREATE POLICY "Users can view team members"
  ON team_members FOR SELECT
  USING (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Team admins can manage members"
  ON team_members FOR INSERT
  WITH CHECK (
    is_super_admin(auth.uid()) OR
    is_team_admin(team_id, auth.uid())
  );

CREATE POLICY "Team admins can update members"
  ON team_members FOR UPDATE
  USING (
    is_super_admin(auth.uid()) OR
    is_team_admin(team_id, auth.uid())
  );

CREATE POLICY "Team admins can delete members"
  ON team_members FOR DELETE
  USING (
    is_super_admin(auth.uid()) OR
    is_team_admin(team_id, auth.uid())
  );

-- Categories policies
CREATE POLICY "Users can view categories"
  ON categories FOR SELECT
  USING (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid()) OR 
    is_global = TRUE
  );

CREATE POLICY "Team members can create categories"
  ON categories FOR INSERT
  WITH CHECK (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Team members can update categories"
  ON categories FOR UPDATE
  USING (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Team admins can delete categories"
  ON categories FOR DELETE
  USING (
    is_super_admin(auth.uid()) OR
    is_team_admin(team_id, auth.uid())
  );

-- Prompts policies
CREATE POLICY "Users can view prompts"
  ON prompts FOR SELECT
  USING (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Team members can create prompts"
  ON prompts FOR INSERT
  WITH CHECK (
    is_super_admin(auth.uid()) OR
    is_team_member(team_id, auth.uid())
  );

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (
    is_super_admin(auth.uid()) OR
    created_by = auth.uid()
  );

CREATE POLICY "Users can delete their own prompts"
  ON prompts FOR DELETE
  USING (
    is_super_admin(auth.uid()) OR
    created_by = auth.uid()
  );

-- User profiles policies
CREATE POLICY "Users can view profiles"
  ON user_profiles FOR SELECT
  USING (
    is_super_admin(auth.uid()) OR
    id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM team_members tm1
      JOIN team_members tm2 ON tm1.team_id = tm2.team_id
      WHERE tm1.user_id = auth.uid() AND tm2.user_id = user_profiles.id
    )
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid() OR is_super_admin(auth.uid()));

CREATE POLICY "Super admins can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (id = auth.uid() OR is_super_admin(auth.uid()));

-- ============================================
-- PART 5: Create trigger to auto-create user profile
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name);
  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Done!
SELECT 'All policies and functions created successfully!' as status;
