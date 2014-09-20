'use strict';

angular.module('banterApp')
  .controller('BanterCtrl', function ($scope, $sce, $timeout) {
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
    var slideIndex = 0;
    var displace = 0;

    $timeout(function() {
      $('.slide').each(function(i, el){
        var editor = new Pen({
          editor: el,
          list: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'insertorderedlist', 'insertunorderedlist']
        });
      });
    }, 100, false);


    $('#forward').click(function() {
      if(slideIndex < $scope.presentation.slides.length - 1) {
        slideIndex++;
        displace = slideIndex * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[slideIndex];
        $scope.$apply();
      }
    });

    $('#backward').click(function() {
      if(slideIndex > 0) {
        slideIndex--;
        displace = slideIndex * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[slideIndex];
        $scope.$apply();
      }
    });

    $('#addSlide').click(function() {
      $scope.presentation.slides.push({
        'content': '<h1>Header</h1><p>Content</p>',
        'keywords': ['Keyword']
      });
      $('.slide').last().velocity({ top: -400 * slideIndex + 'px' });
      $scope.$apply();
    });
  });
