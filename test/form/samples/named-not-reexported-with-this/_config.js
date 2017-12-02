module.exports = {
	// testing include all functionality gets called after variables are bound
	description: 'named export is not re-exported with this',
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
