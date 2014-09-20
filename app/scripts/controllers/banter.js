'use strict';

angular.module('banterApp')
  .controller('BanterCtrl', function ($scope, $sce, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function moveForward() {
      if(slideIndex < $scope.presentation.slides.length - 1) {
        slideIndex++;
        displace = slideIndex * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[slideIndex];
        $scope.$apply();
      }
    };

    function moveBackward() {
      if(slideIndex > 0) {
        slideIndex--;
        displace = slideIndex * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[slideIndex];
        $scope.$apply();
      }
    };


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
          console.log(event.results[i][0].transcript);
          var word = event.results[i][0].transcript;
          if(word.indexOf("next") > -1) {
            moveForward();
            return;
          }

          if(word.indexOf("back") > -1) {
            moveBackward();
            return;
          }

          for(var j = 0; j < $scope.slideCurrent.keywords.length; j++) {
            if(word.indexOf($scope.slideCurrent.keywords[j]) > -1) {
              moveForward();
              return;
            }
          }
        }
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

    $('#start').click(function() {
      if(recording === false) {
        recording = true;
        recognition.lang = 'en-US';
        recognition.start();
      }
    });

    $('#end').click(function() {
      if(recording) {
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
    var slideIndex = 0;
    var displace = 0;

    function addPen() {
      $('.slide').each(function(i, el){
        var editor = new Pen({
          editor: el,
          stay: false,
          list: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'insertorderedlist', 'insertunorderedlist']
        });
      });
    };

    $timeout(function() {
      addPen();
    }, 100, false);



    $('#forward').click(function() {
      moveForward();
    });

    $('#backward').click(function() {
      moveBackward();
    });

    $('#addSlide').click(function() {
      $scope.presentation.slides.push({
        'content': '<h1>Header</h1><p>Content</p>',
        'keywords': ['Keyword']
      });
      $('.slide').last().velocity({ top: -400 * slideIndex + 'px' });
      $scope.$apply();
      $timeout(function() {
        addPen();
      }, 10, false);
    });
  });
