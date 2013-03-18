/*jslint node: true */
/*global angular */
'use strict';


angular.module('filmServices', ['ngResource'])
    .factory('Film', function ($resource) {
        return $resource('films.json', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    });
