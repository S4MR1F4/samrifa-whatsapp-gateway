const waManager = require("../services/whatsappManager");

exports.listGroups = async (req, res) => {
  const sessionName = req.query.session || "default";
  const client = waManager.getSession(sessionName);

  if (!client) {
    return res.status(400).json({ success: false, message: "Session not found" });
  }

  if (!waManager.isReady(sessionName)) {
    return res.status(400).json({
      success: false,
      message: `Session '${sessionName}' is not ready yet. Please wait a moment.`,
    });
  }

  try {
    const chats = await client.getChats();
    const groups = chats
      .filter(c => c.isGroup)
      .map(g => ({
        id: g.id._serialized,
        name: g.name,
        // createdAt: g.timestamp,
      }));

    return res.json({ success: true, groups });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.fetchGroups = async (req, res) => {
  const sessionName = req.query.session || "default";
  const client = waManager.getSession(sessionName);

  if (!client) {
    return res.status(400).json({ success: false, message: "Session not found" });
  }

  if (!waManager.isReady(sessionName)) {
    return res.status(400).json({ success: false, message: `Session '${sessionName}' is not ready yet.` });
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

    return res.json({ success: true, message: "Groups fetched successfully", groups });
  } catch (err) {
    console.error("Fetch Groups Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};