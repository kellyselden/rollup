import Statement from './shared/Statement.js';

export default class ExpressionStatement extends Statement {
	render ( code ) {
		super.render.apply( this, arguments );
		if ( this.included ) this.insertSemicolon( code );
	}
}
