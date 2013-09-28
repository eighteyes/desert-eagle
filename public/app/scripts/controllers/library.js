"use strict";

angular.module('de')
.controller('Library', function ( $scope, SoundService ) {

  $scope.pullList = function(){
    SoundService.list().success(function( resp ) {
      $scope.sounds = resp;
    });
  };



});
