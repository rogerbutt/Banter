'use strict';

angular.module('banterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
  });
