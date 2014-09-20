'use strict';

angular.module('banterApp')
  .controller('RecordCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
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

  });
