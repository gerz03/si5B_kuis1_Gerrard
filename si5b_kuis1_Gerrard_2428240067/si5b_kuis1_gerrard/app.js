require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const shipmentRoutes = require('./routes/shipmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/shipments', shipmentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});

module.exports = app;
