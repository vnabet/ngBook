var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope) {
  $scope.test = 'Vincent';

  $scope.user = {};

  $scope.essai = function() {
    $scope.user.name = 'Vincent';
    console.log($scope.form)
  }

  $scope.submitForm = function() {
    console.log('SUBMIT');
  }
});


myApp.directive('enMaj', function() {
  return {
    require:'?ngModel',
    link: function(scope, el, attrs, ngModel) {
      
      if(!ngModel) return;

      //$formatters du model vers la vue
      //$parsers de la vue vers le model
      ngModel.$formatters.push(function(value) {
          if(value) {
            console.log('titi');
            value += 'TITI';
          }
          
        return value;
      });
  
    }
  }
})

myApp.directive('enConfirm', function() {
  return {
    restrict:'A',
    require:'?ngModel',
    scope: {
      'enConfirm' : '='
    },
    link: function(scope, el, attrs, ngModel ) {
      if(!ngModel) return;

      //console.log(attrs);

      if(!ngModel) return;

      scope.$watch(attrs.ngModel, function(n) {
        console.log('VINCENT : ' + n);
      })

    //el.on('blur', function() { console.log('Bye')});


      ngModel.$parsers.push(function(value) {
        ////
          //console.log(el.inheritedData('$formController').email)
          ////

          if(value) {
            console.log(value);
            console.log(scope.enConfirm);
            if(value === scope.enConfirm) {
              ngModel.$setValidity('enConfirm', true);
            } else {
              ngModel.$setValidity('enConfirm', false);
            }
          }
          
        return value;
      });
    }

  }
});