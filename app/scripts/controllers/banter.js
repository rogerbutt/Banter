'use strict';

angular.module('banterApp')
  .controller('BanterCtrl', [ "$scope", "$sce", "$timeout", "$location", "passPresentation", "$firebase",
  function ($scope, $sce, $timeout, $location, passPresentation, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function similarity(speechText, slideJson)
    {
      var avgScore = slideJson.results[0] || 0;
      var numChecks = slideJson.results[1] || 0;
      var slideText = slideJson.content;
      slideText.replace("\<.*?\>", "");

      var lastBack = speechText.lastIndexOf("back");
      var lastNext = speechText.lastIndexOf("next");
      if(lastNext > lastBack)
        var lastIndex = lastNext;
      else
        var lastIndex = lastBack;

      speechText = speechText.substring(lastIndex + 3);
      var speechLength = speechText.length;
      if(speechLength == 0)
        return [0,0];

      var slideTextLength = slideText.length;
      var diffLength = slideTextLength - speechLength;
      if(diffLength < 0)
        diffLength = 0;

      console.log(slideText);

      var leven = new Levenshtein(slideText, speechText);
      var score = (1 - ((leven - diffLength)/speechLength));
      avgScore = (avgScore + score)/(numChecks + 1);
      return [avgScore, (numChecks + 1)];
    }

    function moveForward() {
      if($scope.presentation.index < $scope.presentation.slides.length - 1) {
        $scope.presentation.slides[$scope.presentation.index] = $scope.slideCurrent;
        $scope.presentation.index++;
        displace = $scope.presentation.index * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[$scope.presentation.index];
        $scope.$apply();
      }
    };

    function moveBackward() {
      if($scope.presentation.index > 0) {
        $scope.presentation.slides[$scope.presentation.index] = $scope.slideCurrent;
        $scope.presentation.index--;
        displace = $scope.presentation.index * -400;
        $('.slide').velocity({ translateY: displace + 'px'});
        $scope.slideCurrent = $scope.presentation.slides[$scope.presentation.index];
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

        var speechList = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          console.log(event.results[i][0].transcript);
          var word = event.results[i][0].transcript;
          speechList += word + " ";

          if(!event.results[i].isFinal) {
            return;
          }

          if(word.indexOf("next") > -1) {
            moveForward();
            return;
          }

          if(word.indexOf("back") > -1) {
            moveBackward();
            return;
          }

          for(var j = 0; j < $scope.slideCurrent.keywords.length; j++) {
            if($scope.slideCurrent.keywords[j].length > 0 && word.indexOf($scope.slideCurrent.keywords[j].toLowerCase()) > -1) {
              moveForward();
              return;
            }
          }
        }

        if(speechList != null) {
          var score = similarity(speechList, $scope.slideCurrent);
          $scope.slideCurrent.results = score;
          $scope.presentation.slides[$scope.presentation.index] = $scope.slideCurrent;
        }
      }

      recognition.onerror = function(event) {
        console.log(event)
      }

      recognition.onend = function() {
        $('#transcript').text(final_transcript);
      }
    }

    $scope.updateSlide = function(event, i) {
      console.log(event.target.innerHTML);
      $scope.presentation.slides[i].content = event.target.innerHTML;
    };

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

      $scope.presentation.slides[$scope.presentation.index] = $scope.slideCurrent;
      passPresentation.setPresentation($scope.presentation);

      $location.path('/results');
      $scope.$apply();
    });

    var ref = new Firebase("https://banterco.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref).$asObject();
    // download the data into a local object

    /*$scope.presentation = {
      'title': 'Banter Presentation',
      'owner': 'Chris Chan',
      'slides': [
        {
          'content': '<h1>Slide 1</h1>',
          'keywords': ['toast'],
          'results' : ['0','0']
        },
        {
          'content': '<h1>MONEY</h1>',
          'keywords': ['Money'],
          'results' : ['0','0']
        }
      ]
    };*/

    function addPen() {
      $('.slide').each(function(i, el){
        var editor = new Pen({
          editor: el,
          stay: false,
          list: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'insertorderedlist', 'insertunorderedlist']
        });
      });
    };

    sync.$bindTo($scope, "presentation").then(function() {
      $scope.slideCurrent = $scope.presentation.slides[0];
      $scope.presentation.index = 0;

      $timeout(function() {
        addPen();
      }, 100, false);

      if(!$scope.$$phase) {
        //$digest or $apply
        $scope.$apply();
      }
    });

    var displace = 0;

    $scope.updateKeywords = function(word, i) {
      console.log(word);
      $scope.slideCurrent.keywords[i] = word;
      $scope.presentation.slides[$scope.presentation.index] = $scope.slideCurrent;
    };

    $('#forward').click(function() {
      moveForward();
    });

    $('#backward').click(function() {
      moveBackward();
    });

    $('#addslide').click(function() {
      $scope.presentation.slides.push({
        'content': '<h1>Header</h1><p>Content</p>',
        'keywords': ['Keyword'],
        'results' : [0,0]
      });
      $scope.$apply();
      $('.slide').last().velocity({ top: -400 * $scope.presentation.index + 'px' });
      $timeout(function() {
        addPen();
      }, 10, false);
    });

    $('#addKeyword').click(function() {
      $scope.slideCurrent.keywords.push('');
    });

  }]);
