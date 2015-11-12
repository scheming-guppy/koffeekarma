angular.module('authorization', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  
  $scope.user = {};

  $scope.signin = function() {
    Auth.signin($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('')
    })
  }

})
