'use strict';

angular.module('banterApp')
  .controller('ClientCtrl', [ "$scope", "$sce", "$firebase",function ($scope, $sce, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var slideIndex = 0;
    var numSlides = 0;

    var unwatch;

    var ref = new Firebase("https://banterco.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref).$asObject();
    // download the data into a local object
    sync.$bindTo($scope, "presentation").then(function() {
      $scope.slideCurrent = $scope.presentation.slides[0];
      slideIndex = $scope.presentation.index;
      numSlides = $scope.presentation.slides.length;

      unwatch = sync.$watch(function() {
        console.log("data changed!");

        if($scope.presentation.index != slideIndex) {
          slideIndex = $scope.presentation.index

          $('.slide').velocity({ translateY: -400 * slideIndex + 'px'});
        }

        if(numSLides != $scopre.presentation.slides.length) {
          $('.slide').last().velocity({ translateY: -400 * slideIndex + 'px'});
        }

      });
    });



  }]);
