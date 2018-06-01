System.register(['new-external'], function (exports, module) {
	'use strict';
	var oldExternal;
	return {
		setters: [function (module) {
			oldExternal = module.default;
		}],
		execute: function () {

			exports('default', oldExternal);

		}
	};
});
