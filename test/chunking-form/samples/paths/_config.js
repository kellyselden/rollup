module.exports = {
	description: 'paths is called for internal and external modules',
	options: {
		input: ['main.js', 'old-internal.js'],
		paths(id, parent) {
			if (id === './old-internal.js' && parent === 'main.js') {
				return './new-internal';
			}
			if (id === 'old-external' && parent === 'old-internal.js') {
				return 'new-external';
			}
		}
	}
};
