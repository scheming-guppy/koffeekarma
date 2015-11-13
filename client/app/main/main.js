angular.module('mainpage', [])

.controller('MainController', ['$scope', '$window', '$location', 'Tickets', 'Auth', function($scope, $window, $location, Tickets, Auth) {

  console.log('this is reaching the controller');

  //hide the sent ticket message
  $scope.hideSentMessage = true;
  $scope.hideNoTicketsMessage = true;

  $scope.user = {};

  $scope.user.tickets = Auth.user.ticketSent - Auth.user.ticketAvailable;

  if($scope.user.tickets > 0) {
    $scope.toggleRedeemBtn = "modal";
  } else {
    $scope.toggleRedeemBtn = "";
  }

  $scope.user.firstName = Auth.user.firstName;
  $scope.user.lastName = Auth.user.lastName;
  $scope.user.age = Auth.user.age;
  $scope.user.userName = Auth.user.userName;
  $scope.user.id = Auth.user.id;
  $scope.user.message = "Have a nice day! Enjoy your coffee!";

  
  $scope.send = function() {
    console.log('reaching the controller, send function');
    console.log($scope.user);
    //use service to make request to server (post request)
    Tickets.send($scope.user).then(function() {
      console.log('sent!');
      $scope.user.tickets++;//TODO: change according to data from server
      $scope.toggleRedeemBtn = "modal";
      $scope.hideSentMessage = false;

    });
  };

  $scope.redeem = function() {
    console.log('reaching the controller, redeem function');
    if($scope.user.tickets <= 0) {
      $scope.hideNoTicketsMessage = false;
      $scope.toggleRedeemBtn = "";
    } else {
      Tickets.redeem($scope.user).then(function(data) {
        $scope.ticketID = data.id;
        console.log(data.id);//The ticket barcode
        $scope.user.tickets--;
      });
    }

  };

}]);
