angular.module('authorization', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  
  $scope.user = {};

  $scope.signin = function() {
    Auth.signin($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.tickit', token);
      $location.path('/main');
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.tickit', token);
        $location.path('/main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});
