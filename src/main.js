var React = require('react');
var MainPage = require('./js/components/MainPage');


React.render(
  <MainPage />,
  document.getElementById('main-content')
);


// if we get an "info" emit from the socket server then console.log the data we recive
var socket = io.connect('http://localhost:3000');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
