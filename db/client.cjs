const { Client } = require('pg');
require('dotenv').config();
const client = new Client(process.env.DATABASE_URL)


module.exports = client;