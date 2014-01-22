var myApp = angular.module('myApp', []);

myApp.controller('parentController', function($scope) {
  $scope.person = {
    greeted: false
  }
});

myApp.controller('childController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.name = 'Vincent';
    $scope.person.greeted = true;
  }
});