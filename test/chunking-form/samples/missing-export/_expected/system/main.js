System.register(['./t1d1.js', './t1d2.js', './t2d1.js', './t3d1.js', './t3d2.js'], function (exports, module) {
	'use strict';
	var $$shim$2, $$shim$2$1, $$shim$2$2, $$shim, $$shim$2$3, $$shim$1;
	return {
		setters: [function (module) {
			$$shim$2 = module.$$shim$2;
		}, function (module) {
			$$shim$2$1 = module.$$shim$2;
		}, function (module) {
			var _setter = {};
			_setter.default = module.$$shim$2;
			_setter.t2d1f1 = module.$$shim$2;
			_setter.t2d1f2 = module.$$shim$2;
			exports(_setter);
		}, function (module) {
			$$shim$2$2 = module.$$shim$2;
			$$shim = module.$$shim;
		}, function (module) {
			$$shim$2$3 = module.$$shim$2;
			$$shim$1 = module.$$shim;
		}],
		execute: function () {

			$$shim$2();
			$$shim$2();

			$$shim$2$1();
			$$shim$2$1();

			$$shim$2$2();
			$$shim$2$2();

			$$shim$2$3();
			$$shim$2$3();

			const $$shim$2$4 = exports('$$shim$2', null);

		}
	};
});
