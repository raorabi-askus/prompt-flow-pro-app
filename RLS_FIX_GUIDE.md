# Fix for Infinite Recursion in team_members RLS Policies

## Problem
The error `"infinite recursion detected in policy for relation team_members"` occurs because the RLS policies on the `team_members` table were querying the same table they were protecting, creating a circular dependency.

## Root Cause
The policies were using subqueries like:
```sql
SELECT user_id FROM team_members tm WHERE tm.team_id = team_members.team_id
```

When Postgres tries to execute this policy, it needs to query `team_members`, which triggers the policy again, creating infinite recursion.

## Solution
Use **SECURITY DEFINER functions** that bypass RLS when checking team membership. These functions run with elevated privileges and can query the table without triggering the RLS policies.

## How to Apply the Fix

### Option 1: Run the Fix Script (Recommended)
Execute the fix script in your Supabase SQL editor:

1. Go to your Supabase dashboard: https://piqoxajcutqkygixmpik.supabase.co
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `scripts/02_fix_rls_policies.sql`
4. Click **Run**

### Option 2: Manual Steps via Supabase Dashboard

1. **Drop the problematic policies:**
   ```sql
   DROP POLICY IF EXISTS "Users can view team members of their teams" ON team_members;
   DROP POLICY IF EXISTS "Team admins can manage members" ON team_members;
   DROP POLICY IF EXISTS "Users can view teams they are members of" ON teams;
   ```

2. **Create helper functions:**
   ```sql
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

   GRANT EXECUTE ON FUNCTION is_team_member(UUID, UUID) TO authenticated;
   GRANT EXECUTE ON FUNCTION is_team_admin(UUID, UUID) TO authenticated;
   ```

3. **Recreate the policies:**
   ```sql
   CREATE POLICY "Users can view teams they are members of"
     ON teams FOR SELECT
     USING (is_team_member(id, auth.uid()) OR created_by = auth.uid());

   CREATE POLICY "Users can view team members of their teams"
     ON team_members FOR SELECT
     USING (is_team_member(team_id, auth.uid()));

   CREATE POLICY "Team admins can manage members"
     ON team_members FOR ALL
     USING (is_team_admin(team_id, auth.uid()));
   ```

## Verification

After applying the fix, test the following endpoints:

1. **Teams endpoint:**
   ```
   https://piqoxajcutqkygixmpik.supabase.co/rest/v1/teams?select=*&order=created_at.desc
   ```

2. **Prompts endpoint:**
   ```
   https://piqoxajcutqkygixmpik.supabase.co/rest/v1/prompts?select=*,categories(name),teams(name)&order=created_at.desc
   ```

Both should now return data without the infinite recursion error.

## What Changed

### Before (Problematic):
```sql
CREATE POLICY "Users can view team members of their teams"
  ON team_members FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM team_members tm WHERE tm.team_id = team_members.team_id
    )
  );
```
❌ This queries `team_members` from within its own policy → infinite recursion

### After (Fixed):
```sql
CREATE POLICY "Users can view team members of their teams"
  ON team_members FOR SELECT
  USING (is_team_member(team_id, auth.uid()));
```
✅ This uses a SECURITY DEFINER function that bypasses RLS → no recursion

## Additional Notes

- The `SECURITY DEFINER` keyword makes the function run with the privileges of the user who created it (typically a superuser), bypassing RLS
- The `SET search_path = public` ensures the function uses the correct schema
- The functions are granted to `authenticated` role so all logged-in users can use them
- The updated `01_create_schema.sql` file now includes these fixes for future deployments
