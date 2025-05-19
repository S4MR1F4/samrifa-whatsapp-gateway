const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: process.env.SESSION_NAME || 'default' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => {
  console.log('🔐 QR Code received, scan with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
});

client.on('auth_failure', () => {
  console.error('❌ Authentication failed. Please delete the session folder.');
});

client.on('disconnected', (reason) => {
  console.warn(`⚠️ WhatsApp client was disconnected: ${reason}`);
});

client.initialize();

module.exports = client;
