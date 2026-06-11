import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { action, payload } = await request.json();

    switch (action) {
      case 'deploy': {
        const rootDir = process.env.PROJECT_ROOT || '/Users/soumitradebprottoy/ai-blog';
        const { stdout, stderr } = await execAsync('npx vercel --yes --prod', {
          cwd: rootDir,
          timeout: 120000,
          env: { ...process.env, PATH: process.env.PATH }
        });
        return NextResponse.json({ success: true, output: stdout, error: stderr || null });
      }

      case 'gitPush': {
        const rootDir = process.env.PROJECT_ROOT || '/Users/soumitradebprottoy/ai-blog';
        const message = payload?.message || `Update: ${new Date().toLocaleDateString()}`;
        const { stdout, stderr } = await execAsync(
          `git add -A && git commit -m "${message.replace(/"/g, '\\"')}" && git push`,
          { cwd: rootDir, timeout: 60000 }
        );
        return NextResponse.json({ success: true, output: stdout, error: stderr || null });
      }

      case 'regenerateThumbnails': {
        const rootDir = process.env.PROJECT_ROOT || '/Users/soumitradebprottoy/ai-blog';
        const { stdout, stderr } = await execAsync('npm run generate:thumbnails', {
          cwd: rootDir,
          timeout: 300000
        });
        return NextResponse.json({ success: true, output: stdout, error: stderr || null });
      }

      default:
        return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
