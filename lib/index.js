var Promise = require('bluebird');
var express = require('express');
var objectHash = require('object-hash');
var openBrowser = require('open');
var path = require('path');

exports = module.exports = inspectweb;

var instanceP = null;
var values = {};
var meta = {};

function start(options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }
  else if(!cb) cb = noop;

  if(!options) options = {};

  var app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', function(req, res) {
    res.render('list', {
      list: Object.keys(values),
      meta: meta,
    });
  });

  app.get('/:hash', function(req, res) {
    res.render('index', {
      json: values[req.params.hash],
      meta: meta[req.params.hash],
    });
  });

  instanceP = new Promise(function(fulfill) {
    var listener = app.listen(function(err) {
      if(err) {
        instanceP = null;
        return cb(err);
      }

      var instance = {
        listener: listener,
        app: app,
      };
      fulfill(instance);

      cb(null, instance);
    });
  });
}

function inspectweb(value, options, cb) {
  function inspect(value) {
    var hash = objectHash(value);

    if(!values[hash]) {
      values[hash] = value;
    }

    if(!meta[hash]) {
      meta[hash] = options.meta;
    }

    if(options.open) {
      instanceP.then(function(instance) {
        openBrowser('http://localhost:' + instance.listener.address().port + '/' + hash);
      });
    }

    instanceP.then(function(instance) {
      cb(null, 'http://localhost:' + instance.listener.address().port + '/' + hash);
    });
  }

  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  if(!cb) cb = noop;

  if(!options) options = {};

  if(!instanceP) {
    start(options, function(err) {
      if(err) {
        cb(err);
        return;
      }

      inspect(value);
    });
    return;
  }

  inspect(value);
}

function noop() {}

exports.close = function(cb) {
  instanceP && instanceP.then(function(instance) {
    instance.listener.close();
    instanceP = null;
    cb();
  });
};

//inspectweb({
  //something: 'here',
//}, { open: true });

//inspectweb({
  //somethingElse: 'there',
//}, { open: true });
