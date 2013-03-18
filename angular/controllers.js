/*jslint node: true */
'use strict';

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
