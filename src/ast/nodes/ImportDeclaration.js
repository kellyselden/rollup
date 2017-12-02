import Node from '../Node.js';
import { createExternalImportString } from '../../finalisers/es';

export default class ImportDeclaration extends Node {
	bindChildren () {}

	initialiseNode () {
		this.isImportDeclaration = true;
	}

	hasEffects () {
		if ( !this.specifiers.length && this.module.resolvedExternalIds[this.source.value] ) {
			return true;
		}
		return super.hasEffects.apply( this, arguments );
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
		if ( preserveModules && this.included ) {
			const externalName = this.module.resolvedExternalIds[this.source.value];
			if (externalName) {
				const externalModule = this.module.bundle.externalModules.find(module => module.id === externalName);
				if (!this.module.renderedExternalModules[externalModule.id]) {
					const getPath = id => this.module.bundle.getPathRelativeToEntryDirname( id );
					const externalImportString = createExternalImportString( externalModule, { getPath, module: this.module, node: this } );
					code.overwrite( this.start, this.end, externalImportString );
					this.module.renderedExternalModules[externalModule.id] = externalModule;
					return;
				}
			} else {
				const name = this.module.resolvedIds[this.source.value];
				if (name) {
					const module = this.module.bundle.modules.find(module => module.id === name);
					if (!this.module.renderedModules[module.id]) {
						const getPath = id => this.module.bundle.getPathRelativeToEntryDirname( id );
						const importString = createExternalImportString( module, { getPath, module: this.module, node: this } );
						code.overwrite( this.start, this.end, importString );
						this.module.renderedModules[module.id] = module;
						return;
					}
				} else {
					return this.eachChild(node => node.render(...arguments));
				}
			}
		}

		code.remove( this.start, this.next || this.end );
	}
}
