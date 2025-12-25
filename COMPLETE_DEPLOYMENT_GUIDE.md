# PromptFlow Pro - Complete Deployment Guide

## Part 1: Download and Prepare Your Project

### Step 1: Download the Project
1. In v0, click the **three dots (⋮)** in the top right of the Code Project block
2. Click **"Download ZIP"**
3. Extract the ZIP file to a folder on your computer
4. Open your terminal/command prompt and navigate to the project folder:
   ```bash
   cd path/to/promptflow-pro
   ```

### Step 2: Verify Local Setup
Before deploying, make sure everything works locally:

```bash
# Install dependencies
npm install

# Create .env.local file for local development
# Copy the content below and create a new file called .env.local
```

Create `.env.local` file in the root folder with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
- Go to Supabase dashboard → Your Project → Settings → API
- Copy "Project URL" and "Anon public key"

Test locally:
```bash
npm run dev
# Visit http://localhost:3000
```

---

## Part 2: Push to GitHub

### Step 1: Initialize Git Repository
```bash
# If not already a git repo
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial PromptFlow Pro setup - ready for deployment"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository name: `promptflow-pro`
3. Do NOT initialize with README (you already have files)
4. Click "Create repository"

### Step 3: Push Your Code to GitHub
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/promptflow-pro.git

# Rename branch if needed
git branch -M main

# Push code
git push -u origin main
```

---

## Part 3: Deploy to Vercel with Supabase

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended - makes it easier)
4. Authorize Vercel to access your GitHub

### Step 2: Import Project to Vercel
1. Go to https://vercel.com/new
2. Under "Import Git Repository", paste:
   ```
   https://github.com/YOUR_USERNAME/promptflow-pro
   ```
3. Click "Import"
4. You'll see project settings page

### Step 3: Add Environment Variables
On the Vercel settings page, scroll down to "Environment Variables" section.

Add these variables (get from Supabase → Settings → API):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase Anon Key (same as above) |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | `https://yourproject.vercel.app/auth/login` |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Key |

**How to find these in Supabase:**
1. Go to https://supabase.com
2. Log in and select your project
3. Go to **Settings** → **API**
4. Copy the values shown there

### Step 4: Deploy
1. After adding env vars, click **"Deploy"** button
2. Vercel will build and deploy your app
3. Wait for the deployment to complete (usually 2-5 minutes)
4. You'll see "Congratulations! Your project has been deployed"

### Step 5: Get Your Live URL
After deployment completes, you'll see your live URL like:
```
https://promptflow-pro.vercel.app
```

---

## Part 4: Set Up Supabase Database

### Step 1: Run Database Schema
Your database needs tables created. Do this:

1. Go to Supabase Dashboard → Your Project
2. Click **"SQL Editor"** on the left sidebar
3. Click **"New Query"**
4. Copy the entire contents of the file `scripts/01_create_schema.sql` from your project
5. Paste it into the SQL Editor
6. Click **"Run"**
7. Wait for it to complete (you should see "Success")

### Step 2: Verify Tables Were Created
In Supabase:
1. Go to **"Table Editor"** on the left
2. You should see these tables:
   - `users_table`
   - `teams`
   - `team_members`
   - `categories`
   - `prompts`

If you see them, everything worked!

---

## Part 5: Test Your Deployment

### Step 1: Visit Your App
1. Go to your Vercel URL: `https://yourproject.vercel.app`
2. Click **"Sign Up"** button
3. Create a test account with:
   - Full Name: `John Doe`
   - Email: `test@example.com`
   - Password: `Test123!@#`

### Step 2: Verify Everything Works
After signing up:
1. You should be redirected to a success page
2. Click "Go to Dashboard"
3. You should see the dashboard with sidebar
4. Try creating a team
5. Try creating a prompt
6. Try the "Improve with AI" button

### Step 3: Check Supabase Database
Go to Supabase Table Editor:
1. Go to `auth.users` table - you should see your test user
2. Go to `teams` table - you should see your test team
3. Go to `prompts` table - you should see your test prompt

---

## Part 6: Update Supabase Redirect URL

After you know your final Vercel URL:

1. Go to Supabase Dashboard → Your Project
2. Go to **Authentication** → **URL Configuration**
3. Under "Redirect URLs" section, add:
   ```
   https://yourproject.vercel.app/auth/login
   ```
4. Click "Save"

This ensures email verification links work properly.

---

## Part 7: Common Issues & Fixes

### Issue: Black screen on login page
**Solution:** Already fixed! Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Invalid Supabase credentials"
**Solution:** 
1. Double-check environment variables in Vercel
2. Make sure you copied the CORRECT keys from Supabase
3. Redeploy: Deployments tab → three dots → "Redeploy"

### Issue: Redirect URL mismatch error
**Solution:**
1. Update Supabase Redirect URLs (see Part 6)
2. Make sure your Vercel URL is correct
3. Redeploy

### Issue: Tables don't exist
**Solution:**
1. Go to Supabase SQL Editor
2. Run the schema script again
3. Check for error messages

---

## Part 8: Admin Access

The **first user to sign up automatically becomes the admin**.

To access admin panel:
1. Sign in with your account
2. Go to Dashboard
3. Click **"⚙️ Settings"** in the sidebar
4. Click **"Admin Settings"**
5. You can now:
   - Create/delete teams
   - Manage categories
   - Manage team members

---

## Your App is Live!

Your PromptFlow Pro app is now deployed and working! 

**Share with your team:** Send them your Vercel URL to sign up and start creating prompts.

---

## Important Notes

- First user to sign up = Admin (they get full access)
- All data is stored in your Supabase database
- You can scale freely - Supabase auto-scales
- Keep your Supabase keys safe - never commit them to GitHub
- For production, use a proper Supabase team instead of free tier (optional)

---

## Need Help?

If something breaks:
1. Check the deployment logs in Vercel
2. Check the database in Supabase (data there means backend works)
3. Open browser console (F12) to see frontend errors
4. Contact Vercel support: https://vercel.com/help
