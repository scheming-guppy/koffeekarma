angular.module('services', [])

.factory('Tickets', function($http, $location, $window) {

  var send = function(userID) {
    console.log('Reaching the service');
    return $http( {
      method: 'POST',
      url: '/api/tickets/send',
      data: userID
    });
  };

  var redeem = function(userID) {
    return $http( {
      method: 'POST',
      url: '/api/tickets/redeem',
      data: userID
    });
  };

  return {
    send: send,
    redeem: redeem
  };

})

.factory('Auth', function($http, $location, $window) {

  var signin = function(user) {
    return $http( {
      method: 'POST',
      url: '/api/user/signin',
      data: user
    })
    .then(function(response) {
      return response.data.token;
    });
  };

  var signup = function(user) {
    return $http( {
      method: 'POST',
      url: '/api/user/signup',
      data: user
    })
    .then(function(response) {
      return response.data.token;
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
    signout: signout
  };

});
