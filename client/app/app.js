angular.module('tickit', [
  'services',
  'ngRoute',
  'authorization',
  'mainpage'])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/signin', {
    templateUrl: 'app/user/signin.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'app/user/signup.html',
    controller: 'AuthController'
  })
  .when('/about', {
    templateUrl: 'app/main/about.html'
  })
  .when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainController'
  })
  .when('/send', {
    tempalteUrl: 'app/tickets/send.html',
    controller: 'SendController'
  })
  .when('/redeem', {
    templateUrl: 'app/tickets/redeem.html',
    controller: 'RedeemController'
  })
  .otherwise({
      redirectTo: '/signin'
    });
});
