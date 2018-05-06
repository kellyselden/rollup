System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function foo () {
      	console.log( 'indented with tabs' );
      }
      exports('default', foo);

    }
  };
});
