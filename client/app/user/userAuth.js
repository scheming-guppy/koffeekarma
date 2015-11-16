angular.module('authorization', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  
  $scope.user = {};
  $scope.hideSigninError = true;
  $scope.hideSignupError = true;

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
    //Since we are signing up for the first time, we have all the information needed
    //except for ticket information which is the same for each new user.
    //ticketSent = 1, ticketAvailable = 0, ticketRedeemed = 0
    $scope.setUser($scope.user);
    Auth.signup($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('com.tickit', data.token);
        $location.path('/main');
      })
      .catch(function (error) {
        $scope.hideSignupError = false;
        console.error(error);
      });
  };

  $scope.setUser = function(data) {
    Auth.user.id = data.id;
    Auth.user.userName = data.userName;
    Auth.user.firstName = data.firstName;
    Auth.user.lastName = data.lastName;
    Auth.user.ticketSent = data.ticketSent || 1;
    Auth.user.ticketAvailable = data.ticketAvailable || 0;
    Auth.user.ticketRedeemed = data.ticketRedeemed || 0;
    console.log('setUser function from controller:', Auth.user);
  };

});
