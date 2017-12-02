import MagicString from 'magic-string';
import { StatementBase } from './shared/Statement';
import { RenderOptions } from '../../rollup';

export default class ExpressionStatement extends StatementBase {
	render (code: MagicString, es: boolean, options: RenderOptions) {
		super.render(code, es, options);
		if (this.included) this.insertSemicolon(code);
	}
}
