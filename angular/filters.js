/*jslint node: true */
/*global angular*/
'use strict';

angular.module('filmFilters', [])
    .filter('starRating', function () {
        return function (n) {
            return (new Array(+n)).join('*');
        };
    });
