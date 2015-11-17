angular.module('services', [])

.factory('Tickets', function($http, $location, $window) {

  var send = function(user) {
    console.log('Reaching the service');
    return $http( {
      method: 'POST',
      url: '/api/tickets/send',
      data: user
    })
    .then(function(response) {
      return response.data;
    })
  };

  var redeem = function(user) {
    console.log('reaching redeem service, user data:', user);
    return $http( {
      method: 'POST',
      url: '/api/tickets/redeem',
      data: user
    })
    .then(function(response) {
      return response.data;
    });
  };

  return {
    send: send,
    redeem: redeem
  };

})

.factory('Auth', function($http, $location, $window) {

  var user = {};

  var signin = function(user) {
    return $http( {
      method: 'POST',
      url: '/api/user/signin',
      data: user
    })
    .then(function(response) {
      return response.data;
    }, function(error) {
      console.error("The user name and password do not match.");
    });
  };

  var signup = function(user) {
    return $http( {
      method: 'POST',
      url: '/api/user/signup',
      data: user
    })
    .then(function(response) {
      return response.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.tickit');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.tickit');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    user: user
  };

});
