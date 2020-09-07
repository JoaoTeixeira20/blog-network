const express = require('express');
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const config = require('./server/config/server-config');

const db = require('./server/config/db');
const app = express();

const UsersRoute = require('./server/routes/UsersRoute');
const PostsRoute = require('./server/routes/PostsRoute');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/users', UsersRoute);
app.use('/posts', PostsRoute);

//entrypoint to the react built app
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//start the server once the database is ready
db.on('connected', () => {
    app.listen(config.server_port, config.server_host, () => {
        console.log(`server is running on ${config.server_host}:${config.server_port}`)
    })
})

//quits the application with an error
db.on('error', () => {
    process.exit(1)
})