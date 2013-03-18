/*jslint node: true */
/*global angular, FilmListCtrl, FilmDetailCtrl */
'use strict';

angular.module('filmList', ['filmFilters', 'filmServices'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/films', {
                templateUrl: 'film-list.html',
                controller: FilmListCtrl
            })
            .when('/films/:filmId', {
                templateUrl: 'film-detail.html',
                controller: FilmDetailCtrl
            })
            .otherwise({redirectTo: '/films'});
    }]);
