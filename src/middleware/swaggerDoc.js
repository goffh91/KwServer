const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');


const options = {
    swaggerDefinition: {
        info: {
            title: 'KwServer API',
            version: '1.0.0',
            description: 'KwServer API with express',
        },
        host: 'localhost:3000',
        basePath: '/'
    },
    apis: ['src/controller/*.js']
};
const specs = swaggereJsdoc(options);


module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs)
};