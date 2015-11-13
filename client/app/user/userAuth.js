angular.module('authorization', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  
  $scope.user = {};
  $scope.hideSigninError = true;

  $scope.signin = function() {
    Auth.signin($scope.user)
    .then(function (data) {
      $scope.setUser(data);
      $window.localStorage.setItem('com.tickit', data.token);
      $location.path('/main');
    })
    .catch(function (error) {
      $scope.hideSigninError = false;
      console.error(error);
    });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function (data) {
        $scope.setUser(data);
        $window.localStorage.setItem('com.tickit', data.token);
        $location.path('/main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.setUser = function(data) {
    Auth.user.id = data.id;
    Auth.user.userName = data.userName;
    Auth.user.firstName = data.firstName;
    Auth.user.lastName = data.lastName;
    Auth.user.age = data.age;
    Auth.user.ticketSent = data.ticketSent;
    Auth.user.ticketAvailable = data.ticketAvailable;
    console.log('setUser function from controller:', Auth.user);
  };

});
