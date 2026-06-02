import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 500 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Cortex <newsletter@cortex.vercel.app>',
      to: email,
      subject: 'Welcome to Cortex — Start Smarter with AI',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: 700; color: #171717; margin: 0;">Welcome to Cortex</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #525252;">
            You are now subscribed to the Cortex newsletter. Every week, you will get the best AI tools, tutorials, comparisons, and automation guides delivered straight to your inbox.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #525252;">
            No spam. No fluff. Just what works.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://cortex.vercel.app/blog" style="display: inline-block; padding: 12px 32px; background: #171717; color: white; text-decoration: none; border-radius: 12px; font-weight: 500;">Start Reading</a>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
          <p style="font-size: 13px; color: #a3a3a3; text-align: center;">
            Cortex — Start Smarter with AI
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
