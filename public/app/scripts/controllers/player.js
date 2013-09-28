"use strict";

angular.module('de')
.controller('Player', function( $scope, SoundService, RegionService ){

  $scope.data = { wave: null, sound : null, regions: null };

  $scope.styles = {};

  $scope.svg = d3;
  $scope.expanded = false;

  $scope.toggleExpand = function() {
    $scope.expanded = !$scope.expanded;
  }

  $scope.play = function() {};

  $scope.stop = function() {};

  $scope.handleRegionStart = function() {};
  $scope.handleRegionEnd = function() {};
  $scope.handleRegionClick = function() {};

  $scope.draw = function () {};

  function stop() {};
  function play() {};
  function drawRegions() {};
  function drawSound() {};
  function drawHashes() {};


});
