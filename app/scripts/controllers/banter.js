'use strict';

angular.module('banterApp')
  .controller('BanterCtrl', function ($scope, $sce) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!('webkitSpeechRecognition' in window)) {
      alert('Only works in Chrome.');
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function() {
      }

      recognition.onresult = function(event) {
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        console.log(interim_transcript);
      }
      recognition.onerror = function(event) {
        console.log(event)
      }
      recognition.onend = function() {
        $('#transcript').text(final_transcript);
      }
    }

    var final_transcript = '';
    var recording = false;

    $('#record').click(function() {

      if(recording === false) {
        recording = true;
        recognition.lang = 'en-US';
        recognition.start();
      } else {
        recording = false;
        recognition.stop();
      }
    });

    $scope.presentation = {
      'slides': [
        {
          'content': '<h1>Slide 1</h1>',
          'keywords': ['toast']
        },
        {
          'content': '<h1>MONEY</h1>',
          'keywords': ['Money']
        }
      ]
    };

    $scope.slideCurrent = $scope.presentation.slides[0];
    $scope.slideIndex = 0;

    $('#forward').click(function() {
      console.log($scope.presentation.slides.length);
      if($scope.slideIndex < $scope.presentation.slides.length - 1) {
        $('.slide').velocity({ translateY: '-= 400px'});
        $scope.slideIndex++;
        $scope.slideCurrent = $scope.presentation.slides[$scope.slideIndex];
      }
    });
    $('#backward').click(function() {
      if($scope.slideIndex > 0) {
        $('.slide').velocity({ translateY: '+= 400px'});
        $scope.slideIndex--;
        $scope.slideCurrent = $scope.presentation.slides[$scope.slideIndex];
      }
    });

    $('#addSlide').click(function() {
      $scope.presentation.slides.push({
        'content': '<h1>Header</h1><p>Content</p>',
        'keywords': ['Keyword']
      });
      $scope.$apply();
    });
  });
