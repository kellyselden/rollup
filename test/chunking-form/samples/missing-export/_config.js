module.exports = {
	description: 'missing export',
	options: {
		input: [
			'main.js',
			't1d1.js',
			't1d2.js',
			't2d1.js',
			't3d1.js',
			't3d2.js',
			't4d1.js'
		],
		shimMissingExports: true
	}
};
