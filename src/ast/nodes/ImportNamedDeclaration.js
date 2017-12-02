import Node from '../Node.js';

export default class ImportNamedDeclaration extends Node {
	includeInBundle () {
		if ( this.included ) return false;
		this.included = true;
		this.specifiers.forEach(specifier => {
			specifier.includeInBundle();
		});
	}
	
	render ( code ) {
		this.specifiers.forEach(specifier => {
			specifier.render(code);
		});
	}
}
