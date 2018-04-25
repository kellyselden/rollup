define(['exports', './t1d1.js', './t1d2.js', './t2d1.js', './t3d1.js', './t3d2.js'], function (exports, t1d1, t1d2, t2d1, t3d1, t3d2) { 'use strict';

	t1d1.$$shim();
	t1d1.$$shim();

	t1d2.$$shim();
	t1d2.$$shim();

	t3d1.$$shim();
	t3d1.$$shim();

	t3d2.$$shim();
	t3d2.$$shim();

	exports.default = t2d1.$$shim;
	exports.t2d1f1 = t2d1.$$shim;
	exports.t2d1f2 = t2d1.$$shim;

	Object.defineProperty(exports, '__esModule', { value: true });

});
