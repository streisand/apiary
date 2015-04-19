var scgi = require("scgi-stream");
var RPC  = require("xmlrpc-stream");


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
    var torrents = [];
    this.rpc.call(
      "d.multicall",
      "default",
      "d.get_hash=",
      "d.get_name=",
      "d.get_bytes_done=",
      "d.get_down_rate=",
      "d.get_completed_bytes=",
      "d.get_up_rate=",
      "d.get_up_total=",
      "d.get_creation_date=",
      "d.get_size_bytes=",
      "or={d.get_up_rate=,d.get_down_rate=}", function(err, res) {
      torrents = res.map(function(torrentInfo) {
        var torrentObj = {};
        torrentObj.infoHash = torrentInfo[0];
        torrentObj.name = torrentInfo[1];
        torrentObj.downloadAmount = torrentInfo[2];
        torrentObj.downloadSpeed = torrentInfo[3];
        torrentObj.downloadTotalSize = torrentInfo[4];
        torrentObj.uploadSpeed = torrentInfo[5];
        torrentObj.uploadTotalSize = torrentInfo[6];
        torrentObj.creationDate = torrentInfo[7];
        torrentObj.totalSize = torrentInfo[8];
        torrentObj.isActive = torrentInfo[9] === 1;

        return torrentObj;
      });
      socket.emit('fetch-torrents', torrents);
    });
  }
};


module.exports = SocketController;