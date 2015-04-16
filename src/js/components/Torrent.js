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
        <div className="status-container">
          <div className="status-info">Status</div>
        </div>
        <div className="torrent-info">
          <div className="torrent-name">
            {this.props.name}
          </div>
          <div className="download-progress">
            <progress value={this.props.downloadAmount} max={this.props.totalSize}></progress>
          </div>
          <div className="torrent-stats">
            <span className="download-speed">{this.bytesToSize(this.props.downloadSpeed)}/s </span>
            <span className="upload-speed">{this.bytesToSize(this.props.uploadSpeed)}/s </span>
            <span className="ratio">{this.getRatioUpOverDown()}</span>
          </div>
        </div>


      </div>
    )
  },

  getRatioUpOverDown: function() {
    var ratioUpOverDown = (this.props.uploadTotalSize / this.props.downloadTotalSize);
    ratioUpOverDown = ratioUpOverDown.toFixed(2);
    return ratioUpOverDown;
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

