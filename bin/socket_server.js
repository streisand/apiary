var server = require('./www');
var io = require('socket.io')(server);

module.exports = io;