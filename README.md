# PromptFlow Pro - AI-Powered Team Prompt Management

A modern, collaborative platform for managing, organizing, and enhancing AI prompts with your team using OpenAI's API.

## Features

✨ **AI Enhancement** - Polish prompts with OpenAI-powered suggestions
👥 **Team Collaboration** - Organize prompts by teams and categories
🔒 **Enterprise Security** - Row-level security, role-based access, encrypted data
🎯 **Easy Organization** - Search, filter, and categorize prompts
📊 **Admin Dashboard** - Manage teams, members, and permissions

## Quick Start

### 1. Sign Up

Visit [PromptFlow Pro](https://your-domain.com) and sign up. The first user automatically becomes an admin.

### 2. Create a Team

- Go to **Dashboard** 
- Follow the onboarding to create your first team
- Or navigate to **Admin Settings → Teams tab**

### 3. Add Team Members

- Go to **Admin Settings → Members tab**
- Enter member email addresses
- Assign roles (Admin or Member)

### 4. Create Categories

When creating your first prompt:
- Choose a team
- Type a new category name to create on-the-fly
- Or go to **Admin Settings → Categories** for bulk management

### 5. Start Adding Prompts

Click **Create Prompt** to add your first prompt with:
- Title and description
- Team and category assignment
- The actual prompt content

### 6. Enhance with AI

- Click any prompt card
- Click **"Improve with AI"**
- Get AI-suggested improvements
- Copy and use in your workflow

## Admin Credentials

**The first user to sign up automatically has admin access.**

To verify you're an admin:
- If you can access **Admin Settings**, you're an admin
- Admin users can:
  - Create and delete teams
  - Manage team members and roles
  - Create and organize categories
  - Manage all users in the system

### Promoting Users to Admin

If you need to promote another user to admin (requires Supabase access):

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

## Setup & Configuration

### Prerequisites

- Supabase project
- OpenAI API key (for prompt enhancement)
- Next.js 16+ environment

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: For development redirect
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=your-openai-key
```

### Database Setup

1. Connect your Supabase project
2. Run the migration script:

```bash
# Using Supabase SQL Editor
# Copy contents of scripts/01_create_schema.sql and run
```

This creates all necessary tables with Row Level Security policies.

## Project Structure

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── auth/                       # Authentication pages
│   ├── login/
│   ├── signup/
│   └── sign-up-success/
└── dashboard/
    ├── page.tsx               # Main dashboard
    ├── layout.tsx             # Dashboard layout with sidebar
    ├── team/                  # Team management
    ├── admin/                 # Admin settings
    └── loading.tsx

components/
├── dashboard/
│   ├── sidebar.tsx           # Navigation sidebar
│   ├── search-bar.tsx        # Prompt search
│   ├── create-prompt-button.tsx
│   ├── create-prompt-modal.tsx
│   ├── improve-prompt-modal.tsx
│   ├── prompt-grid.tsx       # Prompt display
│   ├── prompt-card.tsx       # Individual prompt
│   ├── team-onboarding.tsx   # First-time setup
│   └── loading-screen.tsx
├── admin/
│   ├── team-manager.tsx      # Team CRUD
│   ├── category-manager.tsx  # Category CRUD
│   └── member-manager.tsx    # User management
└── ui/                        # shadcn components

lib/
├── supabase/
│   ├── client.ts            # Browser client
│   └── server.ts            # Server client

scripts/
└── 01_create_schema.sql     # Database migration
```

## Usage Guide

### Creating Prompts

1. Click **Create Prompt** button
2. Fill in details:
   - **Title**: What the prompt does
   - **Description**: Brief explanation  
   - **Team**: Which team owns it
   - **Category**: How to organize it
   - **Content**: The actual prompt text
3. Click **Create**

### Improving Prompts

1. Find a prompt in the grid
2. Click **Improve with AI**
3. Review the suggestions
4. Copy improved version or save

### Managing Teams

**Admin only:**

1. Go to **Admin Settings → Teams**
2. Create teams for different departments/projects
3. Each team can have its own categories and members

### Managing Members

**Admin only:**

1. Go to **Admin Settings → Members**
2. Invite users by email
3. Assign roles:
   - **Admin**: Full control
   - **Member**: Can create/view prompts

### Category Organization

Create categories for:
- Content types (Social Media, Email, etc.)
- Use cases (Customer Support, Sales, etc.)
- Models (GPT-4, Claude, etc.)
- Departments (Marketing, Engineering, etc.)

## API Reference

### Prompt Enhancement

```typescript
POST /api/improve-prompt
Content-Type: application/json

{
  "prompt": "Your prompt text here"
}
```

Response:
```json
{
  "improved": "Enhanced prompt text"
}
```

## Security

- **Row Level Security**: All data is protected by RLS policies
- **Authentication**: Built-in Supabase Auth
- **Encryption**: Data encrypted in transit
- **Audit**: Track who created/modified what

## Troubleshooting

### Can't Access Admin Panel?
- Make sure you're the first user (admin)
- Check your browser console for errors
- Verify Supabase connection

### Prompts Not Showing?
- Ensure you're a member of the team
- Check category assignments
- Verify search query

### AI Enhancement Not Working?
- Check OpenAI API key is set
- Verify you have API credits
- Check prompt length (max 4000 chars)

### Database Errors?
- Run migration script again
- Check Supabase dashboard for errors
- Verify all tables were created

## Support

- Check [Setup Guide](./SETUP_GUIDE.md)
- Check [Admin Guide](./ADMIN_GUIDE.md)  
- Review database schema in `/scripts/01_create_schema.sql`

## License

MIT License - Feel free to use and modify

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ by the PromptFlow Pro team**
