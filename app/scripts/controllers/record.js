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

      }
      recognition.onerror = function(event) {

      }
      recognition.onend = function() {

      }
    }

    $('#record').click(function() {
      final_transcript = '';
      recognition.lang = 'en-US';
      recognition.start();
    });

  });
