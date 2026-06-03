# Setup Instructions for Weekly Blog Posts

## Step 1: Create GitHub Personal Access Token
1. Go to https://github.com/settings/tokens/new
2. Name: `Cortex Bot`
3. Expiration: No expiration
4. Select scopes: Check `repo` AND `workflow`
5. Generate token
6. Copy the token (starts with `ghp_`)

## Step 2: Add token to repo secrets
1. Go to https://github.com/soumitra-prottoy/cortex-blog/settings/secrets/actions
2. Click "New repository secret"
3. Name: `BOT_TOKEN`
4. Value: (paste your token)
5. Click "Add secret"

## Step 3: Create the workflow file
1. Go to https://github.com/soumitra-prottoy/cortex-blog
2. Click "Add file" → "Create new file"
3. Path: `.github/workflows/weekly-posts.yml`
4. Paste the content below
5. Click "Commit directly to main"

```yaml
name: Weekly Blog Posts

on:
  schedule:
    - cron: '0 3 * * 2'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate-posts:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.BOT_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Generate weekly posts
        run: node scripts/weekly-posts.js
        env:
          GITHUB_TOKEN: ${{ secrets.BOT_TOKEN }}
          GITHUB_REPO: ${{ github.repository }}

      - name: Commit and push
        run: |
          git config user.name "Cortex Bot"
          git config user.email "cortex@bot.local"
          git add -A
          git diff --staged --quiet || git commit -m "Weekly blog posts: $(date +%Y-%m-%d)"
          git push
```

## Done!
The workflow runs every Tuesday at 9:00 AM Bangladesh Time.
Manually trigger anytime from the Actions tab on GitHub.
