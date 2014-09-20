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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/banter', {
        templateUrl: 'views/banter.html',
        controller: 'BanterCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
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
