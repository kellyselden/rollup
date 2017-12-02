import FunctionNode from './shared/FunctionNode';
import Scope from '../scopes/Scope.js';

export default class FunctionDeclaration extends FunctionNode {
	initialiseChildren ( parentScope ) {
		this.id && this.id.initialiseAndDeclare( parentScope, 'function', this );
		this.params.forEach( param => param.initialiseAndDeclare( this.scope, 'parameter' ) );
		this.body.initialiseAndReplaceScope( new Scope( { parent: this.scope } ) );
	}

	render ( code ) {
		if ( !this.module.bundle.treeshake || this.included ) {
			super.render.apply( this, arguments );
		} else {
			code.remove( this.leadingCommentStart || this.start, this.next || this.end );
		}
	}
}
