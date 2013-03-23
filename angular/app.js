/*jslint node: true */
/*global angular */
'use strict';

//////////////
// Controllers
// ///////////

var app = angular.module('filmList', ['ngResource']);

// Routing
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix = '!';
        $routeProvider
            .when('/films', {
                templateUrl: 'film-list.html',
                controller: 'FilmListCtrl'
            })
            .when('/films/:filmId', {
                templateUrl: 'film-detail.html',
                controller: 'FilmDetailCtrl'
            })
            .otherwise({redirectTo: '/films'});
    }]);

// Services
app.factory('Film', function ($resource) {
    return $resource('films.json', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
});

// Controllers
app.controller('FilmListCtrl', ['$scope', 'Film', function ($scope, Film) {
    $scope.films = Film.query();
    $scope.orderProp = '-rating';

    $scope.incRating = function (film) {
        film.rating += 1;
    };
}]);

app.controller('FilmDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.filmId = $routeParams.filmId;
    }]);


// Filters
app.filter('starRating', function () {
    return function (n) {
        return (new Array(+n)).join('*');
    };
});
