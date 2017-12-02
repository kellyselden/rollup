import { blank, keys } from '../utils/object.js';

function notDefault ( name ) {
	return name !== 'default';
}

export function createSpecifierString ( imported, local ) {
	if (local !== imported ) {
		return `${imported} as ${local}`;
	} else {
		return imported;
	}
}

export function createSources ( externalModule, node ) {
	// if ( externalModule.isExternal && !node ) {
	// 	return keys( externalModule.declarations ).reduce( ( source, name ) => {
	// 		const declaration = externalModule.declarations[name];
	// 		source[declaration.name] = {
	// 			included: declaration.included,
	// 			// name: declaration.name,
	// 			// safeName: declaration.safeName
	// 			imported: declaration.name,
	// 			local: declaration.safeName
	// 		};
	// 		return source;
	// 	}, blank() );
	// }
	// const exs = externalModule.getExports().concat( externalModule.getReexports() );
	function resolveId ( value ) {
		return module.resolvedIds[value] || module.resolvedExternalIds[value];
	}

	const sources = blank();
	if ( externalModule.isExternal && !node ) {
		keys( externalModule.declarations ).forEach( key => {
			const declaration = externalModule.declarations[key];
			// if (!node && !module.imports[key]) {
			// 	return;
			// }

			sources[declaration.name] = {
				included: declaration.included,
				// name: declaration.name,
				// safeName: declaration.safeName
				imported: declaration.name,
				local: declaration.safeName
			};
		});
	}
	if (node) {
		const { module } = node;

		const namespacedVariables = module.scope.namespacedVariables.filter(variable => {
			return variable.module === externalModule;
		});
		namespacedVariables.forEach(variable => {
			sources[variable.name] = {
				included: true,
				imported: variable.name,
				local: variable.safeName
			};
		});

		const id = resolveId(node.source.value);
		const importNodes = module.ast.body.filter( n => {
			if ( !n.isImportDeclaration ) {
				return;
			}
	
			const _id = resolveId(n.source.value);
			return _id === id;
		} );
		const specifiers = importNodes.reduce( ( specifiers, node ) => {
			node.specifiers.forEach( specifier => {
				const name = specifier.type === 'ImportDefaultSpecifier' ? 'default' : specifier.local.name;
				specifiers[name] = specifier;
			});
			return specifiers;
		}, blank() );
		keys(specifiers).forEach(key => {
			const specifier = specifiers[key];
			if ( specifier ) {
				sources[key] = {
					included: specifier.included,
					imported: specifier.imported ? specifier.imported.name : specifier.local.name,
					local: specifier.local.name
				};
			}
		});
	}
	return sources;
	// return exs.reduce( ( source, ex ) => {
	// return keys(specifiers).reduce( ( source, ex ) => {
	// 	const specifier = specifiers[ex];
	// 	if ( specifier ) {
	// 		source[ex] = {
	// 			included: specifier.included,
	// 			imported: specifier.imported ? specifier.imported.name : specifier.local.name,
	// 			local: specifier.local.name
	// 		};
	// 	} else {
	// 		// source[ex] = {
	// 		// 	name: ex,
	// 		// 	safeName: ex
	// 		// };
	// 	}
	// 	return source;
	// }, blank() );
}

export function createExternalImportString ( externalModule, { getPath, module, node } ) {
	const sources = createSources(externalModule, node);
	const specifiers = [];
	const specifiersList = [specifiers];
	const importedNames = keys( sources )
		.filter( name => name !== '*' && name !== 'default' )
		.filter( name => sources[ name ].included )
		.map( name => {
			if ( name[0] === '*' ) {
				return `* as ${externalModule.name}`;
			}

			const source = sources[ name ];

			// skip safeName when it was an import name collision
			// if ( module ) {
			// 	const alias = keys( module.imports ).find( key => module.imports[key].name === name );
			// 	if ( alias ) {
			// 		return createSpecifierString( name, alias );
			// 	}
			// }

			return createSpecifierString(source.imported, source.local);
		})
		.filter( Boolean );

	if ( sources.default ) {
		const name = externalModule.name || sources.default.local;
		if ( externalModule.exportsNamespace ) {
			specifiersList.push([ `${name}__default` ]);
		} else {
			specifiers.push( name );
		}
	}

	const namespaceSpecifier = sources['*'] && sources['*'].included ? `* as ${externalModule.name}` : null; // TODO prevent unnecessary namespace import, e.g form/external-imports
	const namedSpecifier = importedNames.length ? `{ ${importedNames.sort().join( ', ' )} }` : null;

	if ( namespaceSpecifier && namedSpecifier ) {
		// Namespace and named specifiers cannot be combined.
		specifiersList.push( [namespaceSpecifier] );
		specifiers.push( namedSpecifier );
	} else if ( namedSpecifier ) {
		specifiers.push( namedSpecifier );
	} else if ( namespaceSpecifier ) {
		specifiers.push( namespaceSpecifier );
	}

	const id = node ? node.source.value : externalModule.id;

	return specifiersList
		.map( specifiers => {
			if ( specifiers.length ) {
				return `import ${specifiers.join( ', ' )} from '${getPath(id)}';`;
			}

			return externalModule.reexported ?
				null :
				`import '${getPath(id)}';`;
		})
		.filter( Boolean )
		.join( '\n' );
}

export default function es ( bundle, magicString, { getPath, intro, outro } ) {
	const importBlock = bundle.externalModules
		.map( module => {
			return createExternalImportString( module, { getPath } );
		})
		.join( '\n' );

	if ( importBlock ) intro += importBlock + '\n\n';
	if ( intro ) magicString.prepend( intro );

	const module = bundle.entryModule;

	const exportInternalSpecifiers = [];
	const exportExternalSpecifiers = new Map();
	const exportAllDeclarations = [];

	module.getExports()
		.filter( notDefault )
		.forEach( name => {
			const declaration = module.traceExport( name );
			const rendered = declaration.getName( true );
			exportInternalSpecifiers.push( rendered === name ? name : `${rendered} as ${name}` );
		});

	module.getReexports()
		.forEach( name => {
			const declaration = module.traceExport( name );

			if ( declaration.isExternal ) {
				if ( name[0] === '*' ) {
					// export * from 'external'
					exportAllDeclarations.push( `export * from '${name.slice( 1 )}';` );
				} else {
					if ( !exportExternalSpecifiers.has( declaration.module.id ) ) exportExternalSpecifiers.set( declaration.module.id, [] );
					const rendered = declaration.getName( true );
					exportExternalSpecifiers.get( declaration.module.id ).push( rendered === name ? name : `${rendered} as ${name}` );
				}

				return;
			}

			const rendered = declaration.getName( true );
			exportInternalSpecifiers.push( rendered === name ? name : `${rendered} as ${name}` );
		});

	const exportBlock = [];
	if ( exportInternalSpecifiers.length ) exportBlock.push( `export { ${exportInternalSpecifiers.join(', ')} };` );
	if ( module.exports.default ) exportBlock.push( `export default ${module.traceExport( 'default' ).getName( true )};` );
	if ( exportAllDeclarations.length ) exportBlock.push( exportAllDeclarations.join( '\n' ) );
	if ( exportExternalSpecifiers.size ) {
		exportExternalSpecifiers.forEach( ( specifiers, id ) => {
			exportBlock.push( `export { ${specifiers.join( ', ' )} } from '${id}';` );
		});
	}

	if ( exportBlock.length ) magicString.append( '\n\n' + exportBlock.join( '\n' ).trim() );

	if ( outro ) magicString.append( outro );

	return magicString.trim();
}
