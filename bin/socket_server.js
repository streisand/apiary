var server = require('./www');

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('react-event', function (data) {
    console.log(data);
    socket.emit('news', data);
  });
});