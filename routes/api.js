const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/kirim-pesan", messageController.sendMessage);

module.exports = router;
