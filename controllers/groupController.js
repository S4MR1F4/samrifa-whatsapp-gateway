const waManager = require("../services/whatsappManager");

exports.listGroups = async (req, res) => {
  const sessionName = req.query.session || "default";
  const client = waManager.getSession(sessionName);

  if (!client) {
    return res.status(400).json({ success: false, message: "Session not found" });
  }

  try {
    const chats = await client.getChats();
    const groups = chats
      .filter(c => c.isGroup)
      .map(g => ({
        id: g.id._serialized,
        name: g.name,
        createdAt: g.timestamp,
      }));

    return res.json({ success: true, groups });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
