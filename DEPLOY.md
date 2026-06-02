# Cortex — Deployment Guide

## What You Need To Do (5 minutes)

### Step 1: Push to GitHub
Run these commands in your terminal:

```bash
cd /Users/soumitradebprottoy/ai-blog
git push -u origin main
```

If it asks for your GitHub credentials, enter your username and a Personal Access Token (not your password).
To create a token: GitHub.com → Settings → Developer Settings → Personal Access Tokens → Generate new token (give it "repo" permissions).

### Step 2: Deploy to Vercel
1. Go to vercel.com and sign in
2. Click "Add New Project"
3. Import the GitHub repo "soumitra-prottoy/cortex-blog"
4. Click Deploy (default settings are fine)
5. Wait 2-3 minutes for the first deployment

### Step 3: Configure Resend (Newsletter)
1. Go to resend.com and sign up (free)
2. Go to API Keys → Create API Key
3. Copy the key
4. In Vercel: go to your project → Settings → Environment Variables
5. Add a new variable:
   - Name: RESEND_API_KEY
   - Value: your Resend API key
6. Redeploy the project (Vercel will pick up the new env variable)

### Step 4: Verify Everything Works
1. Visit your Vercel URL (e.g., cortex-blog.vercel.app)
2. Test the newsletter signup form
3. Check that blog posts load correctly
4. Verify sitemap at /sitemap.xml
5. Verify robots.txt at /robots.txt

## What Happens Automatically

- **Every Tuesday at 9 AM**: 4 new blog posts are generated and published
- **Every git push**: Vercel automatically redeploys the site
- **Every new post**: Newsletter subscribers get an email notification

## Custom Domain (Optional)
When you buy a domain:
1. In Vercel: Project Settings → Domains
2. Add your domain (e.g., cortex.ai)
3. Update the DNS records as instructed
4. Update the metadataBase in src/app/layout.tsx to your domain
5. Redeploy

## Adding Your Own Content
To add a post manually, edit src/data/index.ts and add a new entry to the blogPosts array, then push to GitHub.
