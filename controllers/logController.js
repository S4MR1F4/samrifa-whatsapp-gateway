const logger = require("../services/logger");

exports.listLogs = (req, res) => {
  const session = req.query.session || "default";
  const targets = logger.listLogs(session);
  return res.json({ success: true, session, targets });
};

exports.getLogs = (req, res) => {
  const session = req.query.session || "default";
  const target = req.params.target;

  if (!target) {
    return res.status(400).json({ success: false, message: "Target is required" });
  }

  const logs = logger.getLogs(session, target);
  return res.json({ success: true, session, target, logs });
};
