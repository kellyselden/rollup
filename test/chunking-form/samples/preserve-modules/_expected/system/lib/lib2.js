System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function fn () {
        console.log('lib2 fn');
      }
      exports('fn', fn);

    }
  };
});
