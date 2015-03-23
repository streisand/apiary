var React = require('react');
var socket = io.connect('http://localhost:3000');
var MainPage = React.createClass({


  getInitialState: function() {
    return {
      count: 0
    };
  },

  render: function() {

    return (
      <div className="main-container">
        <button onClick={this.rtorrentData}>Get Data</button>
      </div>
    )
  },

  rtorrentData: function(e) {
    socket.emit('rtorrent', 'fetch-info');
    socket.on('rtorrent', function(payload) {
      console.log(payload);
    })
  }
});


module.exports = MainPage;
