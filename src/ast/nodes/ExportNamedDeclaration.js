import Node from '../Node.js';

export default class ExportNamedDeclaration extends Node {
	bindChildren () {
		// Do not bind specifiers
		if ( this.declaration ) this.declaration.bind();
	}

	hasEffects ( options ) {
		return this.declaration && this.declaration.hasEffects( options );
	}

	initialiseNode () {
		this.isExportDeclaration = true;
	}

	// includeInBundle () {
	// 	if ( this.included ) return false;
	// 	this.included = true;
	// 	if ( this.declaration ) {
	// 		this.declaration.includeInBundle();
	// 	}
	// 	this.specifiers.forEach(specifier => {
	// 		specifier.includeInBundle();
	// 	});
	// }

	render ( code, es, preserveModules ) {
		if ( this.declaration ) {
			if (!preserveModules || !this.included) {
				code.remove( this.start, this.declaration.start );
			}
			this.declaration.render( ...arguments );
		} else {
			const start = this.leadingCommentStart || this.start;
			const end = this.next || this.end;

			if ( this.defaultExport ) {
				const name = this.defaultExport.getName( es );
				const originalName = this.defaultExport.original.getName( es );

				if ( name !== originalName ) {
					code.overwrite( start, end, `var ${name} = ${originalName};` );
					return;
				}
			}

			if (!preserveModules || !this.included) {
				code.remove( start, end );
			}
		}
	}
}
