var myApp = angular.module('myApp', []);

myApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('__');
  $interpolateProvider.endSymbol('__');
});


myApp.factory('EmailParser', function($interpolate) {
  return {
    parse : function(text, context){
      var template = $interpolate(text);
      return template(context);
    }
  }

})

myApp.controller('parseController', function($scope, $parse) {
  $scope.toto='Vincent';
  $scope.$watch('expr', function(newVal, oldVal, scope){
      var parseFun = $parse(scope.expr);
      scope.parsedValue = parseFun(scope);
  });
});

myApp.controller('interpolateController', function($scope, EmailParser) {
  $scope.$watch('emailBody', function(body) {
    if(body) {
      //var template = $interpolate(body);
      //$scope.previewText = template({to: $scope.to});
      $scope.previewText = EmailParser.parse(body, {to: $scope.to})
    }
  })
});


