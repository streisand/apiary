var express = require('express');
var router = express.Router();
var scgi = require("scgi-stream");
var RPC  = require("xmlrpc-stream");

var rpc = new RPC(function() {
  return scgi.duplex({
    host: "127.0.0.1",
    port: 4000,
    path: "/"
  });
});

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Express' });
});


router.get('/rtorrent', function(req, res) {

})

module.exports = router;
