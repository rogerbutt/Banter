'use strict';

angular.module('banterApp')
  .controller('ResultsCtrl', [ "$scope", "$firebase", function ($scope, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://banterco.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    var sync = $firebase(ref).$asObject();
    // download the data into a local object
    sync.$bindTo($scope, "presentation").then(function() {
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    });
  }]);

    var chart = c3.generate({
      bindto:"#chart",
      data: {
        columns:
        ['data1',30,20,100,50,30]
      }
    })
