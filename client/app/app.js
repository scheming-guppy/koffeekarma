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
    controller: 'MainController',
    authenticate: true
  })
  .when('/send', {
    tempalteUrl: 'app/tickets/send.html',
    //controller: 'SendController',
    authenticate: true
  })
  .when('/redeem', {
    templateUrl: 'app/tickets/redeem.html',
    //controller: 'RedeemController',
    authenticate: true
  })
  .otherwise({
      redirectTo: '/signin'
    });

  //middlware for ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.tickit');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
