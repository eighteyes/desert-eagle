'use strict';

angular.module('de', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('de').value( "d3", d3 ).
controller('rootCtrl', function( $scope, CheeseService ) {
  $scope.scopes = 'test';
  $scope.cheeseCount = 10;
});
