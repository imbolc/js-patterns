/*jslint node: true */
"use strict";

var $ = require('br-jquery');
$.nano = require('./$.nano.js');

var title = $('title').text();
var header = $.nano('{title} works on jQuery v{v} :)',
    {title: title, v: $.fn.jquery});
$('h1').html(header);
