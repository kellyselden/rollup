System.register(['./t1d1.js', './t1d2.js', './t2d1.js', './t3d1.js', './t3d2.js'], function (exports, module) {
	'use strict';
	var t1d1, t1d1f2, t1d2, t1d2f2, t3d1, unused, f2, t3d2, unused$1, f2$1;
	return {
		setters: [function (module) {
			t1d1 = module.$$shim;
			t1d1f2 = module.$$shim;
		}, function (module) {
			t1d2 = module.$$shim;
			t1d2f2 = module.$$shim;
		}, function (module) {
			var _setter = {};
			_setter.default = module.$$shim;
			_setter.t2d1f1 = module.$$shim;
			_setter.t2d1f2 = module.$$shim;
			exports(_setter);
		}, function (module) {
			t3d1 = module.$$shim;
			unused = module.unused;
			f2 = module.$$shim;
		}, function (module) {
			t3d2 = module.$$shim;
			unused$1 = module.unused;
			f2$1 = module.$$shim;
		}],
		execute: function () {

			t1d1();
			t1d1f2();

			t1d2();
			t1d2f2();

			t3d1();
			f2();

			t3d2();
			f2$1();

		}
	};
});
