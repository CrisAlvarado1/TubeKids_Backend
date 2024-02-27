const bodyParser = require('body-parser');
const cors = require('cors');

// Apply all middleware functions
const applyMiddleware = (app) => {
    applyBodyParser(app);
    applyCors(app);
};

// Parser for the request body to JSON format (required for the POST and PUT methods)
const applyBodyParser = (app) => {
    app.use(bodyParser.json());
}

// CORS
const applyCors = (app) => {
    app.use(cors({
        domains: '*',
        methods: '*'
    }));
}

module.exports = { applyMiddleware };