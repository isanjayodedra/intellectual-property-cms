require('dotenv').config();
const express = require('express');
const queueRoutes = require('./routes/queueRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/queue-service', queueRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`queue-service running on port ${PORT}`));
