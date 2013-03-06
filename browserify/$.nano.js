/*jslint node: true */
/* Nano Templates */
"use strict";

var $ = require('br-jquery');

module.exports = function (template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."), value = data[keys.shift()];
        $.each(keys, function () { value = value[this]; });
        return (value === null || value === undefined) ? "" : value;
    });
};