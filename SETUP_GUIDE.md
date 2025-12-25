# PromptFlow Pro - Complete Setup Guide

## Initial Setup

### 1. Database Setup

After connecting your Supabase integration, run the database migration script:

```bash
# From the /scripts folder, run:
psql -f scripts/01_create_schema.sql
```

Or execute it directly in your Supabase SQL editor (SQL → New Query).

This creates:
- **teams** - Team containers for prompts
- **team_members** - Team membership and roles
- **categories** - Prompt categories
- **prompts** - The actual prompts
- **user_profiles** - User information and roles

### 2. Admin Access

**The first user to sign up becomes an admin automatically.**

To check admin status:
1. Go to **Dashboard → Admin Settings**
2. If you see the Admin panel, you're an admin
3. If you see "Access Denied", you need admin privileges

### 3. First User Setup

When you first sign up:
1. Your profile is automatically created in the `user_profiles` table
2. Your role is set to `'admin'` 
3. You have full access to all admin features

## Team Management

### Creating Teams

**Method 1: From Dashboard**
- Click the onboarding card "Create Team" or go to Admin Settings → Teams tab
- Fill in team name and description
- You're automatically added as admin

**Method 2: Programmatically**
```sql
-- Create a team
INSERT INTO teams (name, description, created_by) 
VALUES ('Engineering', 'Our AI Engineering Team', 'user-id-here');

-- Add yourself as admin
INSERT INTO team_members (team_id, user_id, role)
VALUES ('team-id-here', 'user-id-here', 'admin');
```

### Team Roles

- **Admin**: Can manage members, create categories, delete prompts
- **Member**: Can view and create prompts, suggest improvements

## Category Management

### Where to Add Categories

**Option 1: Quick Add (When Creating Prompts)**
- Click "Create Prompt"
- Select team from dropdown
- Type a new category name directly

**Option 2: Admin Panel**
- Go to Admin Settings → Categories tab
- Click "Create Category"
- Choose team and set as global if needed

### Global vs Team Categories

- **Team Categories**: Only visible to that team's members
- **Global Categories**: Visible to all teams (use for company-wide standards)

## User Management

### Adding Team Members

1. Go to **Admin Settings → Members tab**
2. Click "Add Member"
3. Enter user email
4. Assign role (Admin or Member)
5. They'll be invited to the team

### Removing Members

1. Go to **Admin Settings → Members tab**
2. Find the member
3. Click the trash icon to remove

## Prompt Workflow

### Creating Prompts

1. Go to **Dashboard** or **Create Prompt** button
2. Fill in:
   - **Title**: What this prompt does
   - **Description**: Brief explanation
   - **Team**: Which team owns it
   - **Category**: Organize by category
   - **Content**: The actual prompt text
3. Click "Create Prompt"

### Improving Prompts with AI

1. Click on any prompt card
2. Click "Improve with AI" button
3. Get AI-suggested improvements
4. Copy the improved version or use as-is

### Searching Prompts

Use the search bar on Dashboard to find prompts by:
- Title
- Description
- Category

## Environment Variables

Make sure these are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Row Level Security (RLS)

All tables have RLS enabled. Users can only see:
- Teams they're members of
- Prompts in their teams
- Categories assigned to their teams

This is automatic - no additional configuration needed.

## Troubleshooting

### Can't Access Admin Panel
- Make sure you're the first user who signed up (admin)
- Check your user_profiles.role in Supabase
- Update manually if needed: `UPDATE user_profiles SET role = 'admin' WHERE id = 'your-id'`

### Can't See Prompts
- Make sure you're a member of the team
- Check you have the right permissions in team_members table

### Can't Create Categories
- Make sure you're a team member
- Go to Admin Settings instead of creating on-the-fly

## Support

For issues:
1. Check the Supabase dashboard for errors
2. Verify all environment variables are set
3. Make sure the database schema is properly migrated
4. Check RLS policies are enabled
