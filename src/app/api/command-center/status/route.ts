import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const rootDir = process.env.PROJECT_ROOT || '/Users/soumitradebprottoy/ai-blog';

    // Git status
    let gitStatus = 'unknown';
    let lastCommit = 'unknown';
    let unpushed = false;
    try {
      const gitDir = path.join(rootDir, '.git');
      if (fs.existsSync(gitDir)) {
        const { execSync } = require('child_process');
        const status = execSync('git status --porcelain', { cwd: rootDir }).toString().trim();
        gitStatus = status ? 'dirty' : 'clean';
        lastCommit = execSync('git log -1 --format="%h %s (%cr)"', { cwd: rootDir }).toString().trim();
        const unpushedCheck = execSync('git log @{u}..HEAD --oneline 2>/dev/null || echo "no-upstream"', { cwd: rootDir }).toString().trim();
        unpushed = unpushedCheck !== 'no-upstream' && unpushedCheck.length > 0;
      }
    } catch {
      gitStatus = 'unknown';
    }

    // Vercel deployment status
    let lastDeploy = 'unknown';
    try {
      const { execSync } = require('child_process');
      lastDeploy = execSync('npx vercel ls --yes 2>/dev/null | head -5 | tail -1', { cwd: rootDir, timeout: 15000 }).toString().trim();
    } catch {
      lastDeploy = 'Check vercel.com';
    }

    // Cron job info (from our known setup)
    const cronJobs = [
      { name: 'Tuesday Auto-Post', schedule: 'Every Tuesday 9:00 AM', status: 'active', nextRun: getNextTuesday() },
      { name: 'Friday Telegram Report', schedule: 'Every Friday 11:00 AM', status: 'active', nextRun: getNextFriday() },
    ];

    return NextResponse.json({
      git: { status: gitStatus, lastCommit, unpushed },
      deployment: { lastDeploy },
      cronJobs,
      serverTime: new Date().toISOString(),
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}

function getNextTuesday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = (2 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  next.setHours(9, 0, 0, 0);
  return next.toISOString();
}

function getNextFriday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  next.setHours(11, 0, 0, 0);
  return next.toISOString();
}
