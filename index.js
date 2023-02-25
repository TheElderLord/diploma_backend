const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./auth/auth');
const cors = require('cors')
const app = express();

// Set up body parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Use auth router for authentication routes
app.use('/auth', authRouter);

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});
