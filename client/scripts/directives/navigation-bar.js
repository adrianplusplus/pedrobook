angular
	.module('mainApp')
	.directive('navigationBar', navigationBar);

function navigationBar(){
	var dir = {
		restrict:'AE',
		templateUrl:'views/nav-bar.html',
		scope:{},
		link:linkFn
	};
	function linkFn(scope, elem, attrs){
		
	}

	return dir;
}