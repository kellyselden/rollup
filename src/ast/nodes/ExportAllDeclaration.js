import Node from '../Node.js';

export default class ExportAllDeclaration extends Node {
	initialiseNode () {
		this.isExportDeclaration = true;
	}

	render ( code, es, preserveModules ) {
		if ( !preserveModules || !this.included ) {
			code.remove( this.leadingCommentStart || this.start, this.next || this.end );
		}
	}
}
