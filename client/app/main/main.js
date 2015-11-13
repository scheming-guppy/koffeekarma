angular.module('mainpage', [])

.controller('MainController', ['$scope', '$window', '$location', 'Tickets', 'Auth', function($scope, $window, $location, Tickets, Auth) {

  console.log('this is reaching the controller');

  //hide the sent ticket message
  $scope.hideSentMessage = true;
  $scope.hideNoTicketsMessage = true;

  $scope.user = {};

  $scope.user.tickets = Auth.user.ticketSent - Auth.user.ticketAvailable;
  $scope.user.firstName = Auth.user.firstName;
  $scope.user.lastName = Auth.user.lastName;
  $scope.user.age = Auth.user.age;
  $scope.user.userName = Auth.user.userName;

  
  $scope.send = function() {
    console.log('reaching the controller, send function');
    //get user id from session
    $scope.user.userID = 1;
    //use service to make request to server (post request)
    Tickets.send($scope.user).then(function() {
      console.log('sent!');
      $scope.hideSentMessage = false;

    });
  };

  $scope.redeem = function() {
    console.log('reaching the controller, redeem function');
    if($scope.user.tickets <= 0) {
      $scope.hideNoTicketsMessage = false;
    } else {
      $scope.user.userID = 1;
      Tickets.redeem($scope.user).then(function(data) {
        console.log(data.id);//The ticket barcode
        $scope.user.tickets--;
      });
    }

  };

}]);
