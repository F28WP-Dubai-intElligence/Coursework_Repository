// THIS IS THE JAVASCRIPT FILE FOR FUNCTIONS RELATED TO INTIALIZING AND RUNNING THE SERVER SIDE COMMUNICATIONS


// constants that link to the modules installed
const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const app = express();
const session = require('express-session');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// Start server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const io = socketio(server);

//listen to socket