'use strict';

angular.module('banterApp')
  .controller('ResultsCtrl', function ($scope, passPresentation) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.presentation = passPresentation.getPresentation();
  });
