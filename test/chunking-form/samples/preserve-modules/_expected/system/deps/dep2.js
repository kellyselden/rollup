System.register(['../lib/lib2.js'], function (exports, module) {
  'use strict';
  var fn;
  return {
    setters: [function (module) {
      fn = module.fn;
    }],
    execute: function () {

      function fn$1 () {
        fn();
        console.log('dep2 fn');
      }
      exports('fn', fn$1);

    }
  };
});
