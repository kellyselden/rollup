import { NodeBase } from './shared/Node';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Literal from './Literal';
import MagicString from 'magic-string';
import ExportSpecifier from './ExportSpecifier';
import FunctionDeclaration from './FunctionDeclaration';
import ClassDeclaration from './ClassDeclaration';
import VariableDeclaration from './VariableDeclaration';
import { NodeType } from './index';
import { RenderOptions } from '../../rollup';

export default class ExportNamedDeclaration extends NodeBase {
	type: NodeType.ExportNamedDeclaration;
	declaration: FunctionDeclaration | ClassDeclaration | VariableDeclaration | null;
	specifiers: ExportSpecifier[];
	source: Literal<string> | null;

	isExportDeclaration: true;

	bindChildren () {
		// Do not bind specifiers
		if (this.declaration) this.declaration.bind();
	}

	hasEffects (options: ExecutionPathOptions) {
		return this.declaration && this.declaration.hasEffects(options);
	}

	initialiseNode () {
		this.isExportDeclaration = true;
	}

	render (code: MagicString, es: boolean, options: RenderOptions) {
		if (this.declaration) {
			if (!options.preserveModules || !this.included) {
				code.remove(this.start, this.declaration.start);
			}
			this.declaration.render(code, es, options);
		} else {
			const start = this.leadingCommentStart || this.start;
			const end = this.next || this.end;
			if (!options.preserveModules || !this.included) {
				code.remove(start, end);
			}
		}
	}
}
