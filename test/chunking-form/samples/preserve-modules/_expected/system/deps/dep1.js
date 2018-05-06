System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function fn () {
        console.log('dep1 fn');
      }
      exports('fn', fn);

    }
  };
});
