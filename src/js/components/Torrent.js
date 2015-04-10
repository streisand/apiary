var React = require('react');

var Torrent = React.createClass({

  getInitialState: function() {
    return {
      torrent: {}
    }
  },

  render: function() {
    return (
      <div className="torrent">
        <p className="torrent-info torrent-name">{this.props.name}</p>
        <p className="torrent-info download-amount">{this.bytesToSize(this.props.downloadAmount)}</p>
        <p className="torrent-info">{this.bytesToSize(this.props.downloadSpeed)}/s</p>
        <p className="torrent-info">{this.bytesToSize(this.props.uploadSpeed)}/s</p>
        <p className="torrent-info total-size">{this.bytesToSize(this.props.totalSize)}</p>
        <p className="torrent-info progress-bar"><progress value={this.props.downloadAmount} max={this.props.totalSize}></progress></p>
        <p>{this.getPercentCompleted()}%</p>
      </div>
    )
  },
  getPercentCompleted: function() {
    var percentCompleted = (this.props.downloadAmount / this.props.totalSize) * 100;
    percentCompleted = percentCompleted.toFixed(1);
    return percentCompleted;
  },

  bytesToSize: function(bytes) {
    if(bytes == 0) return '0 B';
    var k = 1024 ;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  }

});

module.exports = Torrent;