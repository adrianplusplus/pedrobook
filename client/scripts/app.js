"use strict"

angular
	.module('mainApp', [
		'ngRoute',
		'toastr',
		'ui.bootstrap',
	])
	// configuration for routes
	.config(configFn)
	// main backed url 
	.constant('BE_URL', 'http://jsonplaceholder.typicode.com');
	
configFn.$inject = ['$routeProvider'];

function configFn($routeProvider){
	$routeProvider
		.when('/landing-page',{
			templateUrl:'views/landing-page.html',
			controller:'LandingPageCtrl',
			controllerAs:'landing'
		})
		.when('/post-details/:postId',{
			templateUrl:'views/post-details.html',
			controller:'PostDetailsCtrl',
			controllerAs:'post'
		})
		.when('/user-details/:userId',{
			templateUrl:'views/user-details.html',
			controller:'UserDetailsCtrl',
			controllerAs:'user'
		})
		.otherwise('/landing-page')
		;

}
