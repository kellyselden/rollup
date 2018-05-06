System.register([], function (exports, module) {
	'use strict';
	return {
		execute: function () {

			function foo() {}
			exports('a', foo);

		}
	};
});
