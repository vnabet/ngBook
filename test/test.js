var errMod = angular.module('errMod', []);

errMod.run(function(errDisplay) {
    window.addEventListener('error', function() {
        errDisplay.log('Merde');
    })
});

errMod.config(['$provide', function($provide) {
    $provide.decorator('$log', function($delegate, shadowLogger) {
            return shadowLogger($delegate);
    });

    $provide.decorator('$exceptionHandler', function($delegate, errorLogService) {
            return errorLogService($delegate);
    });

}]);

errMod.directive("errdiv", function($log, $exceptionHandler) {
    return {
        restrict:'A',
        scope: true,
        template: '<div>VINCENT --------- {{essai}}</div>',

        link: function(scope, elem, attrs) {
            console.log('YEAH BABY');

            //scope.essai = ;
            //scope.$watch("shadowLogger.toto",function(newValue,OldValue,scope){
             //do your work here when data is changed
             //scope.essai = newValue;
            //});
        },
        controller: function($scope) {
            //$scope.essai = $log.toto;
            $scope.essai = $exceptionHandler.errorMessge;

        }
    }
});

errMod.factory("errDisplay", function() {
    return {
        message: '',
        log: function(errorMessage, stackTrace) {
            
            if(!this.div) {
                this.div = document.createElement('div');
                this.div.style.cssText = 'color:red; position:absolute; bottom: 0px; width: 100%; word-break:break-all; height:200px; overflow:auto; border-top:1px solid black; background-color: lightgrey; position: fixed';
                document.body.style.marginBottom = '200px';
                document.body.appendChild(this.div);

            }

            this.message += errorMessage + '<br/>' + stackTrace + '<br/>';

            this.div.innerHTML = this.message;
            

            //document.body.appendChild(div);
        }
    }
})

errMod.factory("errorLogService", function(stacktraceService, errDisplay, $injector) {
    return function($delegate) {
        return function(exception, cause) {
            var errorMessage = exception.toString();
            var stackTrace = stacktraceService.print({ e: exception });
            
            
            this.errorMessge = exception;
            //$injector.get('$rootScope').$digest();

            $delegate(exception, cause);
            //console.log($log.toto);
            
            
        };
    }
})

errMod.factory("shadowLogger", function(errDisplay) {
    return function($delegate) {
        return {
            log: function() { $delegate.log(arguments);this.toto = arguments;},
            info: function() { $delegate.info(arguments);this.toto = arguments;},
            error: function() { $delegate.error(arguments[0]);errDisplay.log(arguments[0]);},
            warn: function() {
                $delegate.warn(arguments);
                console.log("SHADOW", arguments);


                //$injector.get('$rootScope').$on('trtr', function() {console.log('kjljljljjljlj')});
                /*$injector.get('$rootScope').$emit('trtr', 'TITI');
                window.setTimeout(function() {$injector.get('$rootScope').$emit('trtr', 'TITI')}, 5000);*/
                this.toto = arguments;
            }
        }
    }
});

// -------------------------------------------------- //
// -------------------------------------------------- //


// The "stacktrace" library that we included in the Scripts
// is now in the Global scope; but, we don't want to reference
// global objects inside the AngularJS components - that's
// not how AngularJS rolls; as such, we want to wrap the
// stacktrace feature in a proper AngularJS service that
// formally exposes the print method.
errMod.factory(
    "stacktraceService",
    function() {

        // "printStackTrace" is a global object.
        return({
            print: printStackTrace
        });

    }
);

// -------------------------------------------------- //
// -------------------------------------------------- //


// By default, AngularJS will catch errors and log them to
// the Console. We want to keep that behavior; however, we
// want to intercept it so that we can also log the errors
// to the server for later analysis.
/*errMod.provider(
    "$exceptionHandler",
    {
        $get: function( errorLogService ) {

            return( errorLogService );

        }
    }
);*/


// -------------------------------------------------- //
// -------------------------------------------------- //


// The error log service is our wrapper around the core error
// handling ability of AngularJS. Notice that we pass off to
// the native "$log" method and then handle our additional
// server-side logging.
/*errMod.factory(
    "errorLogService",
    function( $log, $window, stacktraceService ) {

        // I log the given error to the remote server.
        function log( exception, cause ) {

            // Pass off the error to the default error handler
            // on the AngualrJS logger. This will output the
            // error to the console (and let the application
            // keep running normally for the user).
            $log.error.apply( $log, arguments );

            // Now, we need to try and log the error the server.
            // --
            // NOTE: In production, I have some debouncing
            // logic here to prevent the same client from
            // logging the same error over and over again! All
            // that would do is add noise to the log.
            try {

                var errorMessage = exception.toString();
                var stackTrace = stacktraceService.print({ e: exception });

                // Log the JavaScript error to the server.
                // --
                // NOTE: In this demo, the POST URL doesn't
                // exists and will simply return a 404.
                //$.ajax({
                //    type: "POST",
                //    url: "./javascript-errors",
                //    contentType: "application/json",
                //    data: angular.toJson({
                //        errorUrl: $window.location.href,
                //        errorMessage: errorMessage,
                //        stackTrace: stackTrace,
                //        cause: ( cause || "" )
                //    })
                //});
                div = document.createElement('div');
                div.style.cssText = 'color:red; position:absolute; bottom: 0px; width: 100%; word-break:break-all; height:200px; overflow:auto; border-top:1px solid black; background-color: lightgrey; position: fixed';
                document.body.style.marginBottom = '200px';
                div.innerHTML = errorMessage + '<br/>' + stackTrace + '<br/>' + cause;
                

                document.body.appendChild(div);

            } catch ( loggingError ) {

                // For Developers - log the log-failure.
                $log.warn( "Error logging failed" );
                $log.log( loggingError );

            }

        }


        // Return the logging function.
        return( log );

    }
);*/