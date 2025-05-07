require('dotenv').config();
const express = require('express');
const sequelize = require('../config/database');
const errorHandler = require('../middleware/errorHandler');

const app = express();
app.use(express.json());

// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/article-translations', require('./routes/articletranslationRoutes'));
app.use('/api/blocks', require('./routes/blockRoutes'));
app.use('/api/article-blocks', require('./routes/articleblockRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/article-categories', require('./routes/articlecategoryRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/article-tags', require('./routes/articletagRoutes'));

app.use(errorHandler);

sequelize.sync();
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`article-service running on port ${PORT}`));
