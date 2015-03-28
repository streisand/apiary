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
        <p className="torrent-info download-amount">{this.props.downloadAmount}</p>
        <p className="torrent-info">{this.props.downloadSpeed}</p>
        <p className="torrent-info">{this.props.uploadSpeed}</p>
        <p className="torrent-info total-size">{this.props.totalSize}</p>
        <p className="torrent-info progress-bar"><progress  value={this.props.downloadAmount} max={this.props.totalSize}></progress></p>
      </div>
    )
  }


});

module.exports = Torrent;