System.register(['./new-internal', 'old-external'], function (exports, module) {
	'use strict';
	var oldInternal;
	return {
		setters: [function (module) {
			oldInternal = module.default;
		}, function () {}],
		execute: function () {

			exports('default', oldInternal);

		}
	};
});
