const path = require('path');
const assert = require('assert');

module.exports = {
	description: 'warns on missing (but unused) imports',
	warnings: [
		{
			code: 'MISSING_EXPORT',
			missing: 'b',
			importer: 'main.js',
			exporter: 'foo.js',
			id: path.resolve(__dirname, 'main.js'),
			message: `'b' is not exported by foo.js`,
			pos: 12,
			loc: {
				file: path.resolve(__dirname, 'main.js'),
				line: 1,
				column: 12
			},
			frame: `
				1: import { a, b } from './foo.js';
				               ^
				2:
				3: assert.equal( a, 42 );
			`,
			url: 'https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module'
		}
	]
};
