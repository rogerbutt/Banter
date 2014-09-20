'use strict';

angular.module('banterApp')
  .controller('ClientCtrl', [ "$scope", "$sce", "$firebase",function ($scope, $sce, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://banterco.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref).$asObject();
    // download the data into a local object
    sync.$bindTo($scope, "presentation").then(function() {
      $scope.slideCurrent = $scope.presentation.slides[0];
    });

  }]);
