const path = require( 'path' );
const assert = require( 'assert' );

module.exports = {
	description: 'default export is not re-exported with export *',
	options: {
		includeMissingExports: true
	}
};
