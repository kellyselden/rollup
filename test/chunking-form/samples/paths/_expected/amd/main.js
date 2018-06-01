define(['./new-internal', 'old-external'], function (oldInternal, oldExternal) { 'use strict';

	oldExternal = oldExternal && oldExternal.hasOwnProperty('default') ? oldExternal['default'] : oldExternal;



	return oldInternal;

});
