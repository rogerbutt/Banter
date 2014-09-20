'use strict';

angular.module('banterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/menu.html',
      })
      .when('/banter', {
        templateUrl: 'views/banter.html',
        controller: 'BanterCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/client', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
