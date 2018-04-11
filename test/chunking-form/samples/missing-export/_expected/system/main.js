System.register(['./t1d1.js', './t1d2.js', './t2d1.js', './t3d1.js', './t3d2.js', './t4d1.js'], function (exports, module) {
	'use strict';
	var t1d1, t1d1f2, t1d2, t1d2f2, t3d1, unused, f2, t3d2, unused$1, f2$1;
	return {
		setters: [function (module) {
			t1d1 = module.default;
			t1d1f2 = module.t1d1f2;
		}, function (module) {
			t1d2 = module.default;
			t1d2f2 = module.t1d2f2;
		}, function (module) {
			var _setter = {};
			_setter.default = module.default;
			_setter.t2d1f1 = module.default;
			_setter.t2d1f2 = module.t2d1f2;
			exports(_setter);
		}, function (module) {
			t3d1 = module.default;
			unused = module.unused;
			f2 = module.f2;
		}, function (module) {
			t3d2 = module.default;
			unused$1 = module.unused;
			f2$1 = module.f2;
		}, function (module) {
			exports('unused', module.unused);
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
