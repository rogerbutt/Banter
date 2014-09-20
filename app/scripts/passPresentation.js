'use strict';

angular.module('banterApp')
  .service('passPresentation', function() {
    var presentation;

    var setPresentation = function(data) {
      presentation = data;
    }

    var getPresentation = function() {
      return presentation;
    }

    return {
      setPresentation: setPresentation,
      getPresentation: getPresentation
    };
  });
