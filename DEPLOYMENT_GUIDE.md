# PromptFlow Pro - Vercel Deployment Guide

## Prerequisites
- Vercel account (free or paid) at https://vercel.com
- GitHub account with your repository
- Supabase project already configured (✅ Done)

## Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial PromptFlow Pro commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/promptflow-pro.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and `promptflow-pro` with your repo name.

## Step 2: Deploy on Vercel

### Option A: Using Vercel Dashboard (Recommended for First Time)

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Select "Import Git Repository"
4. Paste your GitHub repo URL and click "Import"
5. You'll see the project configuration page:
   - **Project Name**: promptflow-pro (or your preferred name)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: ./ (default)
   - **Build Command**: next build (default)
   - **Start Command**: next start (default)
   - **Output Directory**: .next (default)

### Option B: Using Vercel CLI (For Advanced Users)

```bash
npm i -g vercel
vercel
# Follow the prompts to connect and deploy
```

## Step 3: Add Environment Variables to Vercel

After creating the project on Vercel, follow these steps:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add ALL these environment variables from your Supabase project:

### Required Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
POSTGRES_HOST=your_postgres_host
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### Where to Find These Values:

**From Supabase Dashboard:**
1. Go to your Supabase project
2. Click **Settings** → **API**
3. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service role key)
   - `SUPABASE_JWT_SECRET` (JWT Secret)

**From Database Settings:**
1. Click **Settings** → **Database**
2. Copy the connection string for `POSTGRES_URL`

## Step 4: Database Migrations

Your database schema is already created in Supabase! The tables are:
- users (via Supabase Auth)
- user_profiles
- teams
- team_members
- categories
- prompts

All with RLS policies enabled ✅

## Step 5: Deploy

Once environment variables are set:

1. Go back to the **Deployments** tab
2. Click the three dots on your latest deployment
3. Click **Redeploy**

OR simply push a new commit to trigger auto-deployment:

```bash
git add .
git commit -m "Deploy to Vercel"
git push
```

## Step 6: Verify Deployment

After deployment completes:

1. Click the **Visit** button to open your deployed site
2. Test the following:
   - ✅ Sign up with a new email
   - ✅ Create a team
   - ✅ Create a category
   - ✅ Add a prompt
   - ✅ Use "Improve with AI" feature
   - ✅ Access admin settings

## Step 7: Setup Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (usually 5-10 minutes)

## Environment Variables Reference

### Public Variables (Safe to expose in client)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

### Secret Variables (Server-only, never expose)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_HOST`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Troubleshooting

### Build Fails with "Missing env vars"
- Make sure all environment variables are added to Vercel
- Check spelling - they're case-sensitive
- Redeploy after adding variables

### "Cannot connect to database"
- Verify SUPABASE_URL and connection strings are correct
- Check Supabase project status (not suspended)
- Ensure RLS policies allow your auth token

### "Authentication not working"
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Check that Supabase Auth is enabled
- Clear browser cookies and try again

### "AI enhancement not working"
- Verify OPENAI_API_KEY is set (if using OpenAI)
- Check that the API key has access to the GPT model

## Deployment Checklist

Before deploying:
- [ ] All code pushed to GitHub
- [ ] Supabase project created and database initialized
- [ ] Environment variables are ready
- [ ] `tw-animate-css` removed from devDependencies (if still present)
- [ ] All pages tested locally

After deploying:
- [ ] Sign up works
- [ ] Team creation works
- [ ] Prompts can be created
- [ ] Admin can manage categories
- [ ] AI improvement feature works
- [ ] Database queries work correctly

## Performance Tips

1. **Images**: Already optimized with `unoptimized: true` for Vercel
2. **Database**: Use Supabase connection pooling (POSTGRES_PRISMA_URL) for serverless
3. **Caching**: Vercel caches static content automatically
4. **Edge Functions**: Your API routes run on Edge automatically

## Support

- **Vercel Issues**: https://vercel.com/help
- **Supabase Issues**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- GitHub Repository: Update with your repo URL
```

Now let me create additional deployment-related files:
