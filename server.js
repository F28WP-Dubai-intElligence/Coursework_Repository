const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//use morgan middleware
const morgan = require("morgan");
app.use(morgan('dev'));

app.use(express.static('/'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// middleware
app.use(express.json());
app.use(express.urlencoded());


// // Set static folder
// app.use(express.static(path.join(__dirname, "/public/src/js/game.js")))

app.get('/', (req, res) => {
    res.sendFile('game.html', { root: __dirname });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))