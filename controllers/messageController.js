// controllers/messageController.js
const waManager = require("../services/whatsappManager");
const logger = require("../services/logger");

exports.sendMessage = async (req, res) => {
  const { number, message, session } = req.body;
  const sessionName = session || "default";
  const client = waManager.getSession(sessionName);

  if (!number || !message) {
    return res.status(400).json({
      success: false,
      message: "Number and message are required",
    });
  }

  if (!client) {
    return res.status(400).json({
      success: false,
      message: `Session '${sessionName}' not found. Please connect first.`,
    });
  }

  if (!waManager.isReady(sessionName)) {
    return res.status(400).json({
      success: false,
      message: `Session '${sessionName}' is not ready yet. Please wait until QR is scanned and client is connected.`,
    });
  }

  try {
    let chatId;

    if (number.endsWith("@g.us")) {
      // Kirim ke group
      chatId = number;
    } else {
      // Kirim ke user
      const numberId = await client.getNumberId(number);
      if (!numberId) {
        return res.status(400).json({
          success: false,
          message: `The number ${number} is not registered on WhatsApp`
        });
      }
      chatId = numberId._serialized;
    }

    await client.sendMessage(chatId, message);

    logger.logMessage(sessionName, number, message);

    return res.status(200).json({
      success: true,
      message: `Message sent to ${number} via session '${sessionName}'`,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};
