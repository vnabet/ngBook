var app = angular.module('myapp', ['angular-bug']);

app.directive("blublu", function() {
    return {
        restrict:'A',
        link: function(scope, elem, attrs) {
            console.log('YEAH BLUBLU');
        }
    }
})

app.controller('MyController', 
  function ($scope, $log) {

    $scope.clock = {
      now: new Date()
    }

    var updateClock = function() {
      $scope.clock.now = new Date();
    }

    setInterval(function() { 
        //console.log(er.titi);
      $scope.$apply(updateClock);
      //updateClock();
      //$scope.$apply(console.log(er.tt));
      
    }, 1000);

    console.log(er.titi);
    $log.warn("ESSAI");
    
    
    //$log.log("jkljl");

    updateClock();
  }
);

