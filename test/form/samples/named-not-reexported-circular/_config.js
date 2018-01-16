module.exports = {
	// testing include all functionality detects circular dependencies
	description: 'named export is not re-exported with circular dependency',
	options: {
		plugins: [{
			missingExport(module, name, otherModule) {
				if (!otherModule.isExternal) {
					otherModule.includeAllInBundleRecursive();
				}
				return true;
			}
		}]
	}
};
