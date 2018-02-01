import { ExpressionNode, Node, NodeBase } from './shared/Node';
import Variable from '../variables/Variable';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import MagicString from 'magic-string';
import { ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from './shared/Expression';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
import { ObjectPath, ObjectPathKey } from '../values';
export declare function isMemberExpression(node: Node): node is MemberExpression;
export default class MemberExpression extends NodeBase {
	type: NodeType.MemberExpression;
	object: ExpressionNode;
	property: ExpressionNode;
	computed: boolean;
	propertyKey: ObjectPathKey;
	variable: Variable;
	private isBound;
	private replacement;
	private arePropertyReadSideEffectsChecked;
	bind(): void;
	private resolveNamespaceVariables(baseVariable, path);
	forEachReturnExpressionWhenCalledAtPath(
		path: ObjectPath,
		callOptions: CallOptions,
		callback: ForEachReturnExpressionCallback,
		options: ExecutionPathOptions
	): void;
	hasEffects(options: ExecutionPathOptions): boolean;
	hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
	hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
	hasEffectsWhenCalledAtPath(
		path: ObjectPath,
		callOptions: CallOptions,
		options: ExecutionPathOptions
	): boolean;
	includeInBundle(): boolean;
	initialiseNode(): void;
	reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
	private disallowNamespaceReassignment();
	render(code: MagicString, options: RenderOptions): void;
	someReturnExpressionWhenCalledAtPath(
		path: ObjectPath,
		callOptions: CallOptions,
		predicateFunction: SomeReturnExpressionCallback,
		options: ExecutionPathOptions
	): boolean;
}
