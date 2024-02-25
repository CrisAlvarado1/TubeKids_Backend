const bodyParser = require('body-parser');
const cors = require('cors');

const applyMiddleware = (app) => {
    // Parser for the request body to JSON format (required for the POST and PUT methods)
    app.use(bodyParser.json());

    // Cors
    app.use(cors({
        domains: '*',
        methods: '*'
    }));
};

module.exports = { applyMiddleware };