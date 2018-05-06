System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function fn () {
        console.log('dep fn');
      }
      exports('fn', fn);

    }
  };
});
