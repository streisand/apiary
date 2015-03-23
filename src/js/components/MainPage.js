var React = require('react');
var socket = io.connect('http://localhost:3000');

socket.on('rtorrent', function(payload) {
    console.log(payload);
});

var MainPage = React.createClass({

    getInitialState: function() {
        return {
            count: 0
        };
    },

    render: function() {

        return (
            <div className="main-container">
                <button onClick={this.rtorrentDownloads}>Get Download List</button><br/>
                <button onClick={this.rtorrentDownloadRate}>Get Download Rate</button><br/>
                <button onClick={this.rtorrentUploadRate}>Get Upload Rate</button><br/>
            </div>
        )
    },

    rtorrentDownloads: function(e) {
        socket.emit('rtorrent', 'download_list');
    },

    rtorrentDownloadRate: function(e) {
        socket.emit('rtorrent', 'get_down_rate');
    },

    rtorrentUploadRate: function(e) {
        socket.emit('rtorrent', 'get_up_rate');
    }
});


module.exports = MainPage;
