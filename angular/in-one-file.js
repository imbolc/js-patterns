/*jslint node: true */
/*global angular */
'use strict';

//////////////
// Controllers
// ///////////

function FilmListCtrl($scope, Film) {
    $scope.films = Film.query();
    $scope.orderProp = '-rating';

    $scope.incRating = function (film) {
        film.rating += 1;
    };
}
FilmListCtrl.$inject = ['$scope', 'Film'];  // for the correct minification


function FilmDetailCtrl($scope, $routeParams) {
    $scope.filmId = $routeParams.filmId;
}
FilmDetailCtrl.$inject = ['$scope', '$routeParams'];



angular.module('filmList', ['ngResource'])
    //////////
    // Routing
    //////////
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
    }])
    ///////////
    // Services
    ///////////
    .factory('Film', function ($resource) {
        return $resource('films.json', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    })
    //////////
    // Filters
    // ///////
    .filter('starRating', function () {
        return function (n) {
            return (new Array(+n)).join('*');
        };
    });
