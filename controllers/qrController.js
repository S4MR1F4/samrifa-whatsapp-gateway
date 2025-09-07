const waManager = require("../services/whatsappManager");

exports.getQR = (req, res) => {
  const sessionName = req.query.session || "default";
  const client = waManager.getSession(sessionName);

  if (!client || !client._qr) {
    return res.status(400).json({ success: false, message: "QR not available yet. Try again." });
  }

  return res.json({ success: true, session: sessionName, qr: client._qr });
};
