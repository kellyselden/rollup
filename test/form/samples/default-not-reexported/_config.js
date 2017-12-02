module.exports = {
	description: 'default export is not re-exported with export *',
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
