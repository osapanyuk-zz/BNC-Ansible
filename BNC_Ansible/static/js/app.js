'use strict';

var ansibleApp = angular.module('ansibleApp', [
  'ui.router',
  'ngAnimate',
  'ansibleControllers',
  'ansibleDirectives'
]);

ansibleApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

      // Home page
      //.state('home', {
      //  url: '/',
      //})

      // route to show our basic form (/automate)
      // For now treat as home page
      .state('automate', {
          url: '/',
          templateUrl: '../static/partials/port-automate.html',
          controller: 'portAutomate'
      })

      // nested states 
      // each of these sections will have their own view
      // url will be nested (/automate/selection)
      .state('automate.selection', {
          url: 'selection',
          templateUrl: '../static/partials/port-automate-selection.html'
      })
        
      // url will be /automate/configuration
      .state('automate.configuration', {
          url: 'configuration',
          templateUrl: '../static/partials/port-automate-configuration.html'
      })
        
      // url will be /automate/review
      .state('automate.review', {
          url: 'review',
          templateUrl: '../static/partials/port-automate-review.html'
      });
    
      // Create alias for home route
      $urlRouterProvider.when('', '/');

      // Catch all routes
      // Send users home 
      $urlRouterProvider.otherwise('/');

      // Remove '#' from URL for modern browsers
      $locationProvider.html5Mode(true);
  }]);
