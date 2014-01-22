var myApp = angular.module('myApp', ['myApp.filters']);

myApp.controller('mainController', function($scope, $filter){
  $scope.date = new Date();
  $scope.test = $filter('uppercase')('Vincent');

  $scope.isCapitilized = function(value) {
    return value[0] === value[0].toUpperCase();
  }

  $scope.test = function(value) {
    console.log(value);
    return value.prenom == 'Jeanne';
  }
});



var filters = angular.module('myApp.filters', []);

filters.filter('capitalize', function() {
  return function(input) {
    if(input) return input[0].toUpperCase() + input.slice(1);
  }
})