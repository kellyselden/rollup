System.register([], function (exports, module) {
'use strict';
return {
execute: function () {

function foo () {
	console.log( 'not indented' );
}
exports('default', foo);

}
};
});
