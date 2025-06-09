require('dotenv').config();
const { conectarDB } = require('./models/db');

conectarDB();
