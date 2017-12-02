// Return the first non-falsy result from an array of
// maybe-sync, maybe-promise-returning functions
export default function first ( candidates ) {
	return function () {
		return candidates.reduce( ( promise, candidate ) => {
			return promise.then( result => result != null ?
				result :
				Promise.resolve( candidate.apply( this, arguments ) ) );
		}, Promise.resolve() );
	};
}
