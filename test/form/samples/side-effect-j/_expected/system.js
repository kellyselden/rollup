System.register([], function (exports, module) {
	'use strict';
	return {
		execute: function () {

			var augment;
			augment = x => x.augmented = true;

			function x () {}
			augment( x );
			exports('default', x);

		}
	};
});
