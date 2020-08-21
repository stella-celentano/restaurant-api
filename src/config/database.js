const mongoose = require('mongoose');

require('dotenv').config();

let db = null
const URI_DATABASE = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

db = mongoose.connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database successfully connected'))
    .catch(error => console.log(`Error connectiong to database = ERRO: ${error}`))

module.exports = { db }