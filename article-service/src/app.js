const express = require('express');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const routes = require('./route');
const { jwtStrategy } = require('./config/passport');
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./helper/ApiError');

process.env.PWD = process.cwd();

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

// enable cors
app.use(cors());
app.options('*', cors());

app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', async (req, res) => {
    res.status(200).send('Congratulations! API is working!');
});
app.use('', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
const db = require('./models');

// Uncomment this line if you want to sync database model
// db.sequelize.sync()

module.exports = app;
