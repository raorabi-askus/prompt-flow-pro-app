# PromptFlow Pro - Admin Guide

## Admin Capabilities

As an admin, you can:

### Team Management
- Create new teams
- Delete teams (and all associated data)
- View all teams in the system

### Category Management
- Create team-specific categories
- Create global categories (visible to all)
- Delete categories
- Organize prompts by category

### User Management
- Invite users to teams
- Assign roles (Admin/Member)
- Remove users from teams

## Admin Access

To access the Admin panel:
1. Navigate to `/dashboard/admin`
2. You'll see three tabs: Teams, Categories, Members

If you see "Access Denied", you don't have admin privileges.

### Becoming an Admin

**First user signup:**
The very first user to sign up is automatically made an admin.

**Manual promotion:**
If you're the Supabase admin, you can manually set roles:

```sql
-- Make a user an admin
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';

-- Demote an admin
UPDATE user_profiles 
SET role = 'member' 
WHERE email = 'user@example.com';
```

## Teams

### Creating a Team

1. Click "Create Team" button
2. Enter team name (required)
3. Add optional description
4. Click "Create"

You're automatically added as admin.

### Managing Team Members

1. Go to Admin Settings → Members tab
2. Use the form to:
   - **Add members**: Enter email, select role
   - **Remove members**: Click trash icon
   - **Change roles**: Must remove and re-add with new role

### Team Best Practices

- Create teams around departments or projects
- Keep team names descriptive
- Add descriptions for clarity

## Categories

### Creating Categories

1. Go to Admin Settings → Categories tab
2. Enter category name
3. Select team (or leave blank for global)
4. Check "Global" if visible to all teams
5. Click "Create"

### Category Naming Convention

Good category names:
- ✓ "Marketing Copy"
- ✓ "Code Generation"
- ✓ "Customer Support"
- ✓ "Data Analysis"

Poor category names:
- ✗ "General"
- ✗ "Misc"
- ✗ "Stuff"

### Global Categories

Use global categories for:
- Company-wide standards
- Common use cases
- Best practices across teams

Team categories for:
- Department-specific prompts
- Project-specific templates

## User Management

### Adding Users

1. Go to Admin Settings → Members tab
2. Enter user email
3. Select role:
   - **Admin**: Full access to admin panel
   - **Member**: Can create/view prompts, suggest improvements
4. Click "Add"

They'll be invited to the team.

### User Roles in Teams

| Action | Admin | Member |
|--------|-------|--------|
| View prompts | ✓ | ✓ |
| Create prompts | ✓ | ✓ |
| Improve prompts | ✓ | ✓ |
| Delete prompts | ✓ | ✗ |
| Manage team | ✓ | ✗ |
| Invite members | ✓ | ✗ |

## Security Best Practices

1. **Regular Audits**: Check who has access regularly
2. **Remove Unused Accounts**: Delete team members who've left
3. **Role Assignment**: Use least privilege principle
4. **Backup**: Regularly backup important prompts

## Common Tasks

### Set Up New Team

1. Create team in Admin → Teams
2. Create categories for the team
3. Invite team members
4. Share team name with the team

### Migrate from Another Tool

1. Create team
2. Create categories matching your old system
3. Create prompts in correct categories
4. Invite team members
5. Share new dashboard URL

### Archive Old Prompts

Delete from Admin panel if no longer needed (permanent deletion).

## Monitoring

### What to Monitor

- User activity (who's creating prompts)
- Team growth
- Category usage
- Prompt improvements being used

Access logs are available in Supabase dashboard under Logs.
