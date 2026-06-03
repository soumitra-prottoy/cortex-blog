import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await req.json();
    // In production, save to database or config file
    // For now, settings are applied client-side
    
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    siteName: 'Cortex',
    tagline: 'Start Smarter with AI',
    description: 'Your neural network for AI knowledge.',
  });
}
