const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT;
const socketio = require('socket.io');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'my secrete',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));


//use morgan middleware
const morgan = require("morgan");
app.use(morgan('dev'));

// middleware
app.use(express.json());
app.use(express.urlencoded());


app.use(express.static('./public/src'));
app.get('/', (req, res) => {
    res.sendFile('./public/src/index.html', { root: __dirname });
});

const myRouter = require('./routes/post');
app.use(myRouter);

const createDB = require('./DAOS/db');
//createDB();

// Start server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const io = socketio(server);

//listen to socket