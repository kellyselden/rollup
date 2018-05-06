System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function fn () {
        console.log('lib1 fn');
      }
      exports('a', fn);

    }
  };
});
