const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config;
require('./config/generateKeypair.js')();

const PORT = process.env.PORT || 3080;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

require('./config/database');
require('./models/user');

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});