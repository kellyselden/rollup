System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      var dep = exports('a', { x: 42 })

      function log (x) {
        if (dep) {
          console.log(x);
        }
      }
      exports('b', log);

    }
  };
});
