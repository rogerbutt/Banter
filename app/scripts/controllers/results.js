'use strict';

angular.module('banterApp')
  .controller('ResultsCtrl', [ "$scope", "$firebase", "$location", function ($scope, $firebase, $location) {
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

    var axis1 = ['slides'];
    var axis2 = ['score'];
    sync.$bindTo($scope, "presentation").then(function() {
      if(!$scope.$$phase) {
        $scope.$apply();
      }

      for(var i = 0; i < $scope.presentation.slides.length; i++) {
        axis1.push(i);
        if($scope.presentation.slides[i].results)
          axis2.push($scope.presentation.slides[i].results[0]);
        else
          axis2.push(0);
      }
      
      var chart = c3.generate({
        bindto:"#chart",
        data: {
          x:"slides",
          columns:[
            axis1,
            axis2
          ]
        }
      });
    });

    $("#returnHome").click(function(){
      $location.path('/');
      $scope.$apply();
    });
    $('#myModal').modal();

  }]);
