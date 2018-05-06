System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function fn () {
        console.log('lib2 fn');
      }

      function fn$1 () {
        fn();
        console.log('dep2 fn');
      }
      exports('a', fn$1);

    }
  };
});
//# sourceMappingURL=chunk-9a21be24.js.map
