angular.module('services', [])

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
