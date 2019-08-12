const assert = require('assert');

module.exports = {
	description: 'correctly namespaces when using * exports (#910)',
	exports(exports) {
		assert.deepStrictEqual(exports, ['Material', 'Something']);
	}
};
