System.register(['./chunk-abdba260.js'], function (exports, module) {
  'use strict';
  var multiplier;
  return {
    setters: [function (module) {
      multiplier = module.a;
    }],
    execute: function () {

      function mult (num) {
        return num + multiplier;
      }
      exports('mult', mult);

    }
  };
});
