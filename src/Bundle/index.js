import { resolve, sep } from 'path';
import { readFile } from 'sander';
import MagicString from 'magic-string';
import { keys, has } from '../utils/object';
import { sequence } from '../utils/promise';
import sanitize from '../utils/sanitize';
import Module from '../Module/index';
import finalisers from '../finalisers/index';
import replaceIdentifiers from '../utils/replaceIdentifiers';

export default class Bundle {
	constructor ( options ) {
		this.base = options.base;
		this.entryPath = resolve( this.base, options.entry );
		this.entryModule = null;

		this.modulePromises = {};
		this.modules = {};
		this.modulesArray = [];

		// this will store the top-level AST nodes we import
		this.body = [];

		// this will store per-module names, and enable deconflicting
		this.bindingNames = {};
		this.usedNames = {};

		this.externalModules = [];
	}

	collect () {
		return this.build()
			.then( () => {
				return this;
			});
	}

	fetchModule ( path ) {
		if ( !has( this.modulePromises, path ) ) {
			this.modulePromises[ path ] = readFile( path, { encoding: 'utf-8' })
				.then( code => {
					const module = new Module({
						path,
						code,
						bundle: this
					});

					//const bindingNames = bundle.getBindingNamesFor( module );

					// we need to ensure that this module's top-level
					// declarations don't conflict with the bundle so far
					module.definedNames.forEach( name => {

					});

					this.modules[ path ] = module;
					this.modulesArray.push( module );
					return module;
				});
		}

		return this.modulePromises[ path ];
	}

	getBindingNamesFor ( module ) {
		if ( !has( this.bindingNames, module.path ) ) {
			this.bindingNames[ module.path ] = {};
		}

		return this.bindingNames[ module.path ];
	}

	build () {
		// bring in top-level AST nodes from the entry module
		return this.fetchModule( this.entryPath )
			.then( entryModule => {
				this.entryModule = entryModule;

				const importedNames = keys( entryModule.imports );

				entryModule.definedNames
					.concat( importedNames )
					.forEach( name => {
						this.usedNames[ name ] = true;
					});

				// pull in imports
				return sequence( importedNames, name => {
					return entryModule.define( name )
						.then( nodes => {
							this.body.push.apply( this.body, nodes );
						});
				})
					.then( () => {
						entryModule.ast.body.forEach( node => {
							// exclude imports and exports, include everything else
							if ( !/^(?:Im|Ex)port/.test( node.type ) ) {
								this.body.push( node );
							}
						});
					});
			})
			.then( () => {
				this.deconflict();
			});

	}

	deconflict () {
		let definers = {};
		let conflicts = {};

		this.body.forEach( statement => {
			keys( statement._defines ).forEach( name => {
				if ( has( definers, name ) ) {
					conflicts[ name ] = true;
				} else {
					definers[ name ] = [];
				}

				// TODO in good js, there shouldn't be duplicate definitions
				// per module... but some people write bad js
				definers[ name ].push( statement._module );
			});
		});

		keys( conflicts ).forEach( name => {
			const modules = definers[ name ];

			modules.pop(); // the module closest to the entryModule gets away with keeping things as they are

			modules.forEach( module => {
				module.rename( name, name + '$' + ~~( Math.random() * 100000 ) ); // TODO proper deconfliction mechanism
			});
		});

		this.body.forEach( statement => {
			let replacements = {};



			keys( statement._dependsOn )
				.concat( keys( statement._defines ) )
				.forEach( name => {
					const canonicalName = statement._module.getCanonicalName( name );

					if ( name !== canonicalName ) {
						replacements[ name ] = canonicalName;
					}
				});

			replaceIdentifiers( statement, statement._source, replacements );
		});
	}

	generate ( options = {} ) {
		let magicString = new MagicString.Bundle();

		this.body.forEach( statement => {
			const module = statement._module;

			replaceIdentifiers( statement, statement._source, module.nameReplacements );
			magicString.addSource( statement._source );
		});

		const finalise = finalisers[ options.format || 'es6' ];

		if ( !finalise ) {
			throw new Error( `You must specify an output type - valid options are ${keys( finalisers ).join( ', ' )}` );
		}

		magicString = finalise( this, magicString, options );

		return {
			code: magicString.toString(),
			map: magicString.generateMap({

			})
		};
	}

	getSafeReplacement ( name, requestingModule ) {
		// assume name is safe until proven otherwise
		let safe = true;

		name = sanitize( name );

		let pathParts = requestingModule.relativePath.split( sep );

		do {
			let safe = true;

			let i = this.modulesArray.length;
			while ( safe && i-- ) {
				const module = this.modulesArray[i];
				if ( module === requestingModule ) continue;

				let j = module.definedNames.length;
				while ( safe && j-- ) {
					if ( module.definedNames[j] === name ) {
						safe = false;
					}
				}
			}

			if ( !safe ) {
				if ( pathParts.length ) {
					name = sanitize( pathParts.pop() ) + `__${name}`;
				} else {
					name = `_${name}`;
				}
			}
		} while ( !safe );

		return name;
	}
}