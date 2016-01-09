var express = require('express');
var path = require('path');
var open = require('open');

exports = module.exports = inspectweb;

function start() {}

function inspectweb(value, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }
  else if(!cb) cb = noop;

  if(!options) options = {};

  var app = express();
  var listener;

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', function(req, res) {
    res.render('index', {
      json: value
    });
  });
  app.use(express.static(path.join(__dirname, 'public')));

  listener = app.listen(3000, function(err) {
    if(err) return cb(err);
    if(options.open) {
      open('http://localhost:' + listener.address().port);
    }
    cb(null, listener, app);
  });
}

function noop() {}

exports.close = function(cb) {
  exports._listener && exports._listener.close(cb);
  delete exports._listener;
};
