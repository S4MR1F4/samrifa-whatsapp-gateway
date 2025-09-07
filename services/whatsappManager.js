const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

class WhatsAppManager {
  constructor() {
    this.sessions = {};
    this.readyStatus = {};
  }

  createSession(sessionName = "default") {
    if (this.sessions[sessionName]) {
      console.log(`ℹ️ Session '${sessionName}' already exists`);
      return this.sessions[sessionName];
    }

    console.log(`🚀 Initializing new session: ${sessionName}`);

    const client = new Client({
      authStrategy: new LocalAuth({ clientId: sessionName }),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu"
        ],
      },
    });

    client.on("qr", (qr) => {
      console.log(`🔐 QR for session: ${sessionName}`);
      qrcode.generate(qr, { small: true });
    });

    client.on("loading_screen", (percent, message) => {
      console.log(`⏳ ${sessionName} loading: ${percent}% - ${message}`);
    });

    client.on("authenticated", () => {
      console.log(`🔑 ${sessionName} authenticated`);
    });

    client.on("auth_failure", (msg) => {
      console.error(`❌ ${sessionName} auth failure: ${msg}`);
    });

    client.on("ready", () => {
      console.log(`✅ WhatsApp session '${sessionName}' is READY`);
      this.readyStatus[sessionName] = true;
    });

    client.on("disconnected", (reason) => {
      console.warn(`⚠️ Session '${sessionName}' disconnected: ${reason}`);
      delete this.sessions[sessionName];
      delete this.readyStatus[sessionName];
    });

    client.initialize()
      .then(() => console.log(`🔄 ${sessionName} initialization started`))
      .catch(err => console.error(`❌ Failed to initialize ${sessionName}:`, err));

    this.sessions[sessionName] = client;
    this.readyStatus[sessionName] = false;
    return client;
  }

  getSession(sessionName = "default") {
    return this.sessions[sessionName] || null;
  }

  isReady(sessionName = "default") {
    return this.readyStatus[sessionName] || false;
  }

  listSessions() {
    return Object.keys(this.sessions).map((s) => ({
      name: s,
      ready: this.readyStatus[s] || false,
    }));
  }
}

module.exports = new WhatsAppManager();
