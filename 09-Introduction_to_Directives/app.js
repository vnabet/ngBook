

var myApp = angular.module('myApp', ['angular-bug']);

myApp.controller('mainController', function($scope, $log) {
  

});

myApp.directive('myDirective', function() {
  return {
    restrict:'A',
    scope: {
      src : '@',
      title: '@',
      atext: '='
    },
    replace:true,
    template:'<div class="panel panel-default">'
+'  <div class="panel-heading"><h3 class="panel-title">{{title}}</h3></div>'
+'  <div class="panel-body text-center">'
+'  <input type="text" ng-model="atext"/><br />'
+'    <img src="{{src}}"/>'
+'  </div>'
+'</div>',
    link: function(scope, el, attrs) {
    
    }
  }
})


