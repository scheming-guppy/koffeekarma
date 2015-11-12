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


  return {
    signin: signin,
    signup: signup
  };

});
