const fs = require("fs");
const path = require("path");

class Logger {
  constructor() {
    this.baseDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir);
    }
  }

  logMessage(session, target, message) {
    const sessionDir = path.join(this.baseDir, session);
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir);
    }

    const filePath = path.join(sessionDir, `${target}.json`);

    let logs = [];
    if (fs.existsSync(filePath)) {
      try {
        logs = JSON.parse(fs.readFileSync(filePath));
      } catch (e) {
        logs = [];
      }
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      session,
      target,
      message,
      status: "sent"
    };

    logs.push(logEntry);
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  }

  listLogs(session) {
    const sessionDir = path.join(this.baseDir, session);
    if (!fs.existsSync(sessionDir)) return [];

    return fs.readdirSync(sessionDir).map(f => f.replace(".json", ""));
  }

  getLogs(session, target) {
    const filePath = path.join(this.baseDir, session, `${target}.json`);
    if (!fs.existsSync(filePath)) return [];

    return JSON.parse(fs.readFileSync(filePath));
  }
}

module.exports = new Logger();
