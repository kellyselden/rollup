import Node from '../../Node.js';

export default class Statement extends Node {
	render ( code ) {
		if ( !this.module.bundle.treeshake || this.included ) {
			super.render.apply( this, arguments );
		} else {
			code.remove( this.leadingCommentStart || this.start, this.next || this.end );
		}
	}
}
