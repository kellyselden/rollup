define(['exports', './t1d1.js', './t1d2.js', './t2d1.js', './t3d1.js', './t3d2.js', './t4d1.js'], function (exports, t1d1, t1d2, t2d1, t3d1, t3d2, t4d1) { 'use strict';

	t1d1.default();
	t1d1.t1d1f2();

	t1d2.default();
	t1d2.t1d2f2();

	t3d1.default();
	t3d1.f2();

	t3d2.default();
	t3d2.f2();

	exports.default = t2d1.default;
	exports.t2d1f1 = t2d1.default;
	exports.t2d1f2 = t2d1.t2d1f2;
	exports.unused = t4d1.unused;

	Object.defineProperty(exports, '__esModule', { value: true });

});
