const client = require("../services/whatsappClient");

exports.sendMessage = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Number and message are required" });
  }

  try {
    await client.sendMessage(number + "@c.us", message);
    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};
