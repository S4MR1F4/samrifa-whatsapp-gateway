const client = require('../services/whatsappClient');

exports.sendMessage = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ success: false, message: 'Number and message are required.' });
  }

  const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;

  try {
    await client.sendMessage(formattedNumber, message);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};
