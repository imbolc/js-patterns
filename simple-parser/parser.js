/*jslint node: true */
"use strict";

var fs = require('fs'),
  $ = require('jquery'),
  request = require('request'),
  mongoose = require('mongoose'),

  resultDir = 'var/result/';

mongoose.connect('mongodb://localhost/simple_node_parser');
var CacheSchema = mongoose.Schema({
  url: String,
  content: String
});
var Cache = mongoose.model('Cache', CacheSchema);

function prepare() {
  if (!fs.existsSync('var')) {
    fs.mkdirSync('var');
  }
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }
}

function load_page(url, callback) {
  console.log('load page:', url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('page loaded:', url);
      callback(body);
    } else {
      console.warn('page did not loaded:', url);
      console.warn(error);
    }
  });
}

function get_cached_or_load_page(url, callback) {
  Cache.findOne({url: url}, function (error, obj) {
    //console.log(error, obj);
    if (!error && obj) {
      console.log('page found in the cache:', url);
      callback(obj.content);
    } else {
      load_page(url, function (content) {
        var cache = new Cache({url: url, content: content});
        cache.save(function () {
          callback(content);
        });
      });
    }
  });
}

function parse_page(content) {
  var dom = $(content);
  return {
    title: dom.find('title').text()
  };
}

function save_json(data, filename) {
  var dump = JSON.stringify(data, null, 2);
  fs.writeFileSync(resultDir + filename, dump);
}

prepare();
['nodejs.org', 'python.org', 'ya.ru'].forEach(function (host) {
  var url = 'http://' + host + '/';
  get_cached_or_load_page(url, function (dom) {
    var data = parse_page(dom);
    console.log(data);
    save_json(data, host + '-index.json');
  });
});

