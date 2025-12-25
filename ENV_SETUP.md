# Environment Variables Setup

## Quick Copy-Paste Setup

1. **Log into Supabase Dashboard**: https://app.supabase.com

2. **Find Your API Keys**:
   - Project Settings → API
   - Copy your `Project URL` and `Anon Key`

3. **Find Your Service Role Key**:
   - Project Settings → API → Service Role Key
   - Scroll down and copy it

4. **Find Your JWT Secret**:
   - Project Settings → API → JWT Secret
   - Copy it

5. **Find Your Database Connection String**:
   - Project Settings → Database → URI
   - Copy the connection string

## Environment Variables for Vercel

Once you have all values, go to:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables (replace with YOUR actual values):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-super-secret-jwt-token
POSTGRES_URL=postgresql://postgres:password@db.xxxxxxxx.supabase.co:5432/postgres
POSTGRES_PRISMA_URL=postgresql://postgres:password@db.xxxxxxxx.supabase.co:6543/postgres
POSTGRES_URL_NON_POOLING=postgresql://postgres:password@db.xxxxxxxx.supabase.co:5432/postgres
POSTGRES_HOST=db.xxxxxxxx.supabase.co
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-db-password
POSTGRES_DATABASE=postgres
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## Testing Variables Locally

Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_value_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value_here
SUPABASE_URL=your_value_here
SUPABASE_SERVICE_ROLE_KEY=your_value_here
SUPABASE_JWT_SECRET=your_value_here
POSTGRES_URL=your_value_here
POSTGRES_PRISMA_URL=your_value_here
POSTGRES_URL_NON_POOLING=your_value_here
POSTGRES_HOST=your_value_here
POSTGRES_USER=your_value_here
POSTGRES_PASSWORD=your_value_here
POSTGRES_DATABASE=your_value_here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

Then run:
```bash
npm run dev
```

## Important Security Notes

- Never commit `.env.local` to GitHub
- The `.env.local` file is in `.gitignore` by default
- Only the `NEXT_PUBLIC_*` variables can be used in the browser
- All other variables are server-only
- Rotate your Supabase keys regularly
- Use separate keys for development and production
