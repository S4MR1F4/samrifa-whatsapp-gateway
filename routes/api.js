const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const sessionController = require("../controllers/sessionController");
const groupController = require("../controllers/groupController");
const logController = require("../controllers/logController");
const qrController = require("../controllers/qrController");

// Message
router.post("/kirim-pesan", messageController.sendMessage);

// Session
router.post("/connect", sessionController.connectSession);
router.get("/sessions", sessionController.listSessions);

// Group
router.get("/groups", groupController.listGroups);
router.get("/fetch-groups", groupController.fetchGroups);

// QR
router.get("/qr", qrController.getQR);

// Logs
router.get("/logs", logController.listLogs);
router.get("/logs/:target", logController.getLogs);

module.exports = router;
