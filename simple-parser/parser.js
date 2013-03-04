/*jslint node: true */
"use strict";

var fs = require('fs'),
  $ = require('jquery'),
  request = require('request'),

  resultDir = 'var/result/';

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
      callback($(body));
    } else {
      console.warn('page did not loaded:', url);
      console.warn(error);
    }
  });
}

function parse_page(dom) {
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
  load_page(url, function (dom) {
    var data = parse_page(dom);
    console.log(data);
    save_json(data, host + '-index.json');
  });
});

