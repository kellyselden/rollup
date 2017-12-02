import Node from '../Node.js';

export default class ImportDeclaration extends Node {
	bindChildren () {}

	initialiseNode () {
		this.isImportDeclaration = true;
	}

	includeInBundle () {
		let addedNewNodes = !this.included;
		this.included = true;
		this.specifiers.forEach( node => {
			if ( node.shouldBeIncluded() ) {
				if ( node.includeInBundle() ) {
					addedNewNodes = true;
				}
			}
		} );
		this.source.includeInBundle();
		return addedNewNodes;
	}

	render ( code, es, preserveModules ) {
		if (!preserveModules || !this.included || !this.someChild(node => node.included)) {
			code.remove( this.start, this.next || this.end );
		} else {
			this.eachChild(node => node.render(...arguments));
		}
	}
}
