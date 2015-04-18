var scgi = require("scgi-stream");
var RPC  = require("xmlrpc-stream");

var rpc = new RPC(function() {
  return scgi.duplex({
    host: "127.0.0.1",
    port: 4000,
    path: "/"
  });
});

function SocketController(socket) {
  this.io = socket;
  this.torrents = [];
  this.rpc = new RPC(function() {
    return scgi.duplex({
      host: "127.0.0.1",
      port: 4000,
      path: "/"
    });
  });

  this.io.on('connection', function(socket) {
    console.log('Fetching torrents.');
    var self = this;
    this.fetchTorrents(socket);

    socket.on('getUpdates', function(res) {
      self.fetchTorrents(socket);
    });

  }.bind(this));
}

SocketController.prototype = {
  constructor: SocketController,

  fetchTorrents: function(socket) {
    this.rpc.call("d.multicall", "default", "d.get_hash=", "d.get_name=",  "d.get_bytes_done=",  "d.get_down_rate=", "d.get_up_rate=", "d.get_creation_date=", "d.get_size_bytes=", function(err, res) {
      torrents = res.map(function(torrentInfo) {
        var torrentObj = {};
        torrentObj.infoHash = torrentInfo[0];
        torrentObj.name = torrentInfo[1];
        torrentObj.downloadAmount = torrentInfo[2];
        torrentObj.downloadSpeed = torrentInfo[3];
        torrentObj.uploadSpeed = torrentInfo[4];
        torrentObj.creationDate = torrentInfo[5];
        torrentObj.totalSize = torrentInfo[6];
        torrentObj.isActive = torrentInfo[7] === 1;
        return torrentObj;
      });
      socket.emit('fetch-torrents', torrents);
    });
  }
};


module.exports = SocketController;