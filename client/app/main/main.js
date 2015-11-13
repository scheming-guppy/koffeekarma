angular.module('mainpage', [])

.controller('MainController', ['$scope', '$window', '$location', 'Tickets', function($scope, $window, $location, Tickets) {

  console.log('this is reaching the controller');

  //hide the sent ticket message
  $scope.hideMessage = true;

  $scope.user = {};
  
  $scope.send = function() {
    console.log('reaching the controller');
    //get user id from session
    $scope.user.userID = 1;
    //use service to make request to server (post request)
    Tickets.send($scope.user).then(function() {
      console.log('sent!');
      $scope.hideMessage = false;
      
    });
  };

  $scope.redeem = function() {

  };

}]);
