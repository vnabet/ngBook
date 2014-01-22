var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope) {

});

myApp.directive('myDirective', function() {
  return {
    restrict:'A',
    scope: {
      src : '@',
      title: '@'
    },
    replace:true,
    template:'<div class="panel panel-default">'
+'  <div class="panel-heading"><h3 class="panel-title">{{title}}</h3></div>'
+'  <div class="panel-body text-center">'
+'    <img src="{{src}}"/>'
+'  </div>'
+'</div>',
    link: function(scope, el, attrs) {

    }
  }
})


