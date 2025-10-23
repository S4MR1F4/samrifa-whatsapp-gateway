// controllers/sessionController.js
const waManager = require("../services/whatsappManager");

exports.connectSession = (req, res) => {
  const { session } = req.body;
  waManager.createSession(session || "default");
  return res.json({ success: true, message: "Session initialized" });
};

exports.listSessions = (req, res) => {
  const sessions = waManager.listSessions();
  return res.json({ success: true, sessions });
};
