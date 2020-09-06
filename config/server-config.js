require('dotenv').config()

const config = {
    database_uri: process.env.DB_URI,
    server_host: process.env.HOST,
    server_port: process.env.PORT,
    token_secret: process.env.TOKEN_SECRET
}

module.exports = config