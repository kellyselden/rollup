import Node from '../Node.js';

export default class ImportSpecifier extends Node {
	includeInBundle () {
		if ( this.included ) return false;
		this.included = true;
		const x = this._getImport(this.local.name);

		const otherModule = x.module;

		const exportDeclaration = otherModule.exports && otherModule.exports[ x.name ];
		if ( exportDeclaration ) {
			if (exportDeclaration.specifier) {
				exportDeclaration.specifier.includeInBundle();
			} else if (exportDeclaration.declaration) {
				exportDeclaration.declaration.includeInBundle();
			}
		}
		const reexportDeclaration = otherModule.reexports && otherModule.reexports[ x.name ];
		if ( reexportDeclaration ) {
			reexportDeclaration.specifier.includeInBundle();
		}
		return true;
	}

	render ( code ) {
		if (this.included) {
			return;
		}

		let str = code.original.substr(this.end);
		let matches = str.match(/^\W+/m);
		let clean;
		if (matches) {
			const len = matches[0].length;
			code.remove( this.end, this.end + len );
			clean = true;
		}

		code.remove( this.start, this.end );

		if (clean) {
			return;
		}

		str = code.original.substr(0, this.start);
		matches = str.match(/\W+$/m);
		if (matches) {
			const len = matches[0].length;
			code.remove( this.start - len, this.start );
		}
	}
}
