const express = require('express');
const https = require('https');

const app = express();
app.use(express.json());

const TOKEN='***';
const GITHUB_REPO = process.env.GITHUB_REPO || 'soumitra-prottoy/cortex-blog';

function httpsRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function sendTelegram(chatId, text) {
  const body = JSON.stringify({ chat_id: chatId, text });
  await httpsRequest(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
}

async function triggerGitHubAction() {
  const pat = process.env.GITHUB_PAT;
  if (!pat) return 'ERROR: GITHUB_PAT not set';
  const body = JSON.stringify({ ref: 'main' });
  const res = await httpsRequest(
    `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/weekly-posts.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        'Authorization': `token ${pat}`,
        'Content-Type': 'application/json',
        'User-Agent': 'CortexBot',
        'Accept': 'application/vnd.github+json',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );
  return res.status === 204 ? 'OK' : `Error ${res.status}: ${res.body}`;
}

app.post('/webhook', async (req, res) => {
  const msg = req.body.message;
  if (!msg || !msg.text) { res.sendStatus(200); return; }

  const chatId = msg.chat.id.toString();
  const text = msg.text.trim();

  try {
    if (text === '/start') {
      await sendTelegram(chatId,
        'Welcome to Cortex Bot!\n\n' +
        'I manage your Cortex blog remotely.\n\n' +
        'Commands:\n' +
        '/posts - Generate weekly blog posts now\n' +
        '/status - Check blog status\n' +
        '/help - Show commands\n\n' +
        'Blog: cortex-blog-sigma.vercel.app'
      );
    } else if (text === '/posts' || text === '/generate') {
      await sendTelegram(chatId, 'Triggering weekly blog post generation...');
      const result = await triggerGitHubAction();
      if (result === 'OK') {
        await sendTelegram(chatId,
          'Done! GitHub Action triggered.\n\n' +
          '4 new blog posts are being generated.\n' +
          'Vercel will auto-deploy in ~2 minutes.\n\n' +
          'Check: https://cortex-blog-sigma.vercel.app'
        );
      } else {
        await sendTelegram(chatId, `Failed: ${result}`);
      }
    } else if (text === '/status') {
      await sendTelegram(chatId,
        'Cortex Blog Status\n\n' +
        'Site: https://cortex-blog-sigma.vercel.app\n' +
        'Repo: ' + GITHUB_REPO + '\n' +
        'Auto-posts: Every Tuesday 9 AM Bangladesh\n\n' +
        'Use /posts to generate manually.'
      );
    } else if (text === '/help') {
      await sendTelegram(chatId,
        'Cortex Bot Commands\n\n' +
        '/posts - Generate blog posts now\n' +
        '/status - Blog status\n' +
        '/help - This message'
      );
    } else {
      await sendTelegram(chatId,
        `I got: "${text}"\n\nUse /posts to generate blog posts, or /help for commands.`
      );
    }
  } catch (err) {
    console.error('Error:', err.message);
    try { await sendTelegram(chatId, `Error: ${err.message}`); } catch {}
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', bot: 'CortexBot', uptime: process.uptime() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Cortex Bot running on port ${PORT}`);
  if (process.env.RENDER_EXTERNAL_URL) {
    const webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
    try {
      const body = JSON.stringify({ url: webhookUrl });
      await httpsRequest(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      }, body);
      console.log('Webhook set to:', webhookUrl);
    } catch (err) {
      console.error('Webhook error:', err.message);
    }
  }
});
