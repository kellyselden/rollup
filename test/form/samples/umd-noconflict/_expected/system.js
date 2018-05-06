System.register([], function (exports, module) {
	'use strict';
	return {
		execute: function () {

			function doThings() {
				console.log( 'doing things...' );
			}

			const number = exports('number', 42);

			var setting = exports('setting', 'no');
			exports('doThings', doThings);

		}
	};
});
