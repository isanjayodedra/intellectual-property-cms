require('dotenv').config();
const express = require('express');
const queueRoutes = require('./route/queueRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//-------For Swager docs----------------
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');
    const fs = require('fs');
    const path = require('path');
    const swaggerDefinition = require('./docs/swaggerDef');
    const options = {
    swaggerDefinition,
    apis: ['./src/route/*.js', './src/controllers/*.js'],
    };
    const swaggerSpec = swaggerJsdoc(options);
    // Serve generated swagger.json separately
    app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
    });
    // Serve the custom HTML for Swagger UI
    app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, './docs/swagger-template.html'));
    });
//-------For Swager docs----------------

//-------- for Health check----------
const healthCheckRoute = require('./route/healthCheck');
app.use('/', healthCheckRoute); // Attach route
//-------- for Health check----------

app.use(express.json());
app.use('/queue-service', queueRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`queue-service running on port ${PORT}`));
