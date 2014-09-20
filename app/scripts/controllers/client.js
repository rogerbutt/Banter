'use strict';

angular.module('banterApp')
  .controller('ClientCtrl', [ "$scope", "$sce", "$timeout", "$firebase",function ($scope, $sce, $timeout, $firebase) {
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

        $timeout(function() {
          if($scope.presentation.index != slideIndex) {
            slideIndex = $scope.presentation.index;

            $('.slide').velocity({ translateY: (-400 * slideIndex).toString() + 'px'});

            console.log((-400 * slideIndex).toString() + 'px');
          }

          if(numSlides != $scope.presentation.slides.length) {
            $('.slide').last().velocity({ translateY: (-400 * slideIndex).toString() + 'px'});
          }
        }, 50, false);
      });

    });

    var rating;
    $(".icon-star").hover(function(){
        var data = ["1star","2star","3star","4star","5star"];
        var index = $(this).attr("value")
        for(var i =0;i<index;i++)
        {
            var starz = data[i]
            starz = "#"+starz;
            $(starz).addClass("active");
        }
        for(var i =index;i<5;i++)
        {
            var starz = data[i]
            starz = "#"+starz;
            $(starz).removeClass("active");
        }
    })

    $scope.rate = function(val) {
      rating = val;
      console.log(val);

      $('.icon-star').css('color', 'white');
      switch(val) {
        case 5:
          $('.ratings .icon-star:nth-child(5)').css("color", '#f1c40f');
        case 4:
          $('.ratings .icon-star:nth-child(4)').css("color", '#f1c40f');
        case 3:
          $('.ratings .icon-star:nth-child(3)').css("color", '#f1c40f');
        case 2:
          $('.ratings .icon-star:nth-child(2)').css("color", '#f1c40f');
        case 1:
          $('.ratings .icon-star:nth-child(1)').css("color", '#f1c40f');
      }
    }

    $('.submit').click(function() {
      $scope.presentation.slides[$scope.presentation.index].comments = $scope.presentation.slides[$scope.presentation.index].comments || [];
      $scope.presentation.slides[$scope.presentation.index].comments.push($('.chatbox').val());
      $('.chatbox').val('');
    });

  }]);
