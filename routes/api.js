const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const sessionController = require("../controllers/sessionController");
const groupController = require("../controllers/groupController");

// Message
router.post("/kirim-pesan", messageController.sendMessage);

// Session
router.post("/connect", sessionController.connectSession);
router.get("/sessions", sessionController.listSessions);

// Group
router.get("/groups", groupController.listGroups);

module.exports = router;
