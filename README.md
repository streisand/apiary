# Apiary

  A replacement to ruTorrent.

  Currently functions as a front-end interface for the rtorrent backend.

## Installation

  First install gcc because rtorrent cannot be built without it.

    brew install gcc

  Next install the supported torrent backend, rtorrent.

    brew install rtorrent --with-xmlrpc-c
  
  Install gulp and bower globally
    
    npm install -g gulp bower
    
  Use NPM and Bower to install some packages from the provided dependency file.
  
    npm install
    bower install

## Usage

  In a terminal window start the rtorrent server.

    rtorrent

  In a separate terminal window run the default gulp task from the root of your apiary directory.

    gulp
