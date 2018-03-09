import { ExpressionNode, Node, NodeBase } from './shared/Node';
import CallOptions from '../CallOptions';
import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import MagicString from 'magic-string';
import {
	ExpressionEntity,
	ForEachReturnExpressionCallback,
	SomeReturnExpressionCallback
} from './shared/Expression';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isProperty(node: Node): node is Property;
export default class Property extends NodeBase {
	type: NodeType.Property;
	key: ExpressionNode;
	value: ExpressionNode;
	kind: 'init' | 'get' | 'set';
	method: boolean;
	shorthand: boolean;
	computed: boolean;
	private _accessorCallOptions;
	reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
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
	initialiseAndDeclare(parentScope: Scope, kind: string, _init: ExpressionEntity | null): void;
	initialiseNode(_parentScope: Scope): void;
	render(code: MagicString, options: RenderOptions): void;
	someReturnExpressionWhenCalledAtPath(
		path: ObjectPath,
		callOptions: CallOptions,
		predicateFunction: SomeReturnExpressionCallback,
		options: ExecutionPathOptions
	): boolean;
}
