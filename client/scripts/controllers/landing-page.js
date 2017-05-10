angular
	.module('mainApp')
	.controller('LandingPageCtrl', LandingPageCtrl);

LandingPageCtrl.$inject = ['PostService'];

function LandingPageCtrl(PostService){
	var vm = this;
	vm.msg = 'All Posts'

	PostService.getAll()
		.then(function(response){
			vm.posts = response.data;
			var chunk_size = 3;
			vm.groupPosts =  vm.posts.map( function(e,i){ 
			    return i%chunk_size===0 ? vm.posts.slice(i,i+chunk_size) : null; 
			})
			.filter(function(e){ return e; });
		});


}