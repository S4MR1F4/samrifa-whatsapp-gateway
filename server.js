require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('=====================================');
	console.log(' Samrifa Software Development');
	console.log(' bagian dari SamrifaGroup');
	console.log(' WhatsApp Gateway - Powered by Node.js');
	console.log('=====================================');
	console.log(`✅ Samrifa WhatsApp Gateway is running on port ${PORT}`);
});
