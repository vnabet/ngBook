var angularbug = angular.module('angular-bug', []);

/**
 * Module configuration. Provide decorator on $log.
 * 
 */
angularbug.config(['$provide', function($provide) {
    $provide.decorator('$log', function($delegate, bugLogger) {
            return bugLogger($delegate);
    });
}]);

/**
 * Module Init. Handle 'error' event for all non angular errors.
 * 
 */
angularbug.run(['bugDisplay', function(bugDisplay) {
  window.addEventListener('error', function(errorEvent) {
    bugDisplay.error(errorEvent.error);

  });
}]);

/**
 * Log display. We don't use Directive because 
 * binding errors doesn't work in case of angular error.
 * 
 */
angularbug.factory('bugDisplay', ['bugStacktrace', function(bugStacktrace) {
  return {
    _message: '',
    error: function(message) {
      if(!this.div) {
          this.div = document.createElement('div');
          this.div.style.cssText = 'color:red; position:absolute; bottom: 0px; width: 100%; word-break:break-all; height:200px; overflow:auto; border-top:1px solid black; background-color: lightgrey; position: fixed';
          document.body.style.marginBottom = '200px';
          document.body.appendChild(this.div);

      }

      var errorMessage = message.toString();
      var stackTrace = bugStacktrace.print({ e: message });
      /*stackTrace = stackTrace.split(',');*/

      this._message += errorMessage + '</br>';
      for(var i = 0; i < stackTrace.length; i++) {
        this._message += '&nbsp;&nbsp;&nbsp;&nbsp;&#9500;&nbsp;' + stackTrace[i] + '<br/>';
      }
      this._message += '<hr/>';
      this.div.innerHTML = this._message;
    }
  }

}]);

/**
 * Reference to Stacktrace
 * 
 */
angularbug.factory('bugStacktrace', function(){
  return {
    print: printStackTrace
  }
});

/**
 * $log Decorator
 * 
 */
angularbug.factory("bugLogger", ['bugDisplay', function(bugDisplay) {
    return function($delegate) {
        return {
            log: function() { $delegate.log(arguments[0]);},
            info: function() { $delegate.info(arguments[0]);},
            error: function() { $delegate.error(arguments[0]);bugDisplay.error(arguments[0]);},
            warn: function() { $delegate.warn(arguments[0]);}
        }
    }
}]);