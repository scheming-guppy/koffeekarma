angular.module('tickit', [
  'services',
  'ui.router',
  'authorization',
  'mainpage'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('/signin', {
    templateUrl: 'app/user/signin.html',
    controller: 'AuthController'
  })
  .state('/signup', {
    templateUrl: 'app/user/signup.html',
    controller: 'AuthController'
  })
  .state('/about', {
    templateUrl: 'app/main/about.html'
  })
  .state('/main', {
    tempalteUrl: 'app/main/main.html',
    controller: 'MainController'
  })
  .state('/send', {
    tempalteUrl: 'app/tickets/send.html',
    controller: 'SendController'
  })
  .state('/redeem', {
    templateUrl: 'app/tickets/redeem.html',
    controller: 'RedeemController'
  });
});
