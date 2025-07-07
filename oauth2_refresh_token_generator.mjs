import http from 'http';
import readline from 'readline/promises';
import { google } from 'googleapis';
import open from 'open';
import url from 'url';

// Step 1: Display help link
console.log('\nIf you don’t know your Google OAuth credentials, visit:');
console.log('👉 https://console.cloud.google.com/auth/clients/\n');

// Step 2: Prompt for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function validateInput(value, name) {
  if (!value || value.trim() === '') {
    console.error(`❌ Error: ${name} is required. Please run the script again.`);
    process.exit(1);
  }
  return value.trim();
}

const clientId = validateInput(await rl.question('Enter your Client ID: '), 'Client ID');
console.log(`✅ Client ID: ${clientId}`);

const clientSecret = validateInput(await rl.question('Enter your Client Secret: '), 'Client Secret');
console.log(`✅ Client Secret: ${clientSecret}`);

const redirectUri = validateInput(
  await rl.question('Enter your Redirect URI (e.g., http://127.0.0.1:8000/google-callback): '),
  'Redirect URI'
);
console.log(`✅ Redirect URI: ${redirectUri}\n`);

console.log('🌐 Starting local server on 127.0.0.1:8000...\n');

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

// Step 3: Auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/cloud-platform'],
  prompt: 'consent',
});

console.log('🔗 Opening auth URL:\n', authUrl);
await open(authUrl);

// Step 4: Local server for callback
const server = http.createServer(async (req, res) => {
  if (!req.url.includes('/google-callback')) {
    res.writeHead(404);
    return res.end();
  }

  const query = url.parse(req.url, true).query;
  const code = query.code;

  if (!code) {
    res.writeHead(400);
    return res.end('Missing code in callback URL.');
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const refreshToken = tokens.refresh_token;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ Success! You can close this window.');

    console.log('\n✅ SUCCESS! Paste this in your .env file:\n');
    console.log(`GEMINI_OAUTH_CLIENT_ID=${clientId}`);
    console.log(`GEMINI_OAUTH_CLIENT_SECRET=${clientSecret}`);
    console.log(`GEMINI_OAUTH_REFRESH_TOKEN=${refreshToken || '❌ Refresh token not returned'}`);
  } catch (err) {
    console.error('\n❌ Error while exchanging code:', err.message);
    res.writeHead(500);
    res.end('Error occurred. Check terminal.');
  } finally {
    server.close();
    rl.close();
  }
}).listen(8000, () => {
  console.log('🌐 Listening on http://127.0.0.1:8000');
});
