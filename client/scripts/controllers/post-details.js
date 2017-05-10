angular
	.module('mainApp')
	.controller('PostDetailsCtrl', PostDetailsCtrl);

PostDetailsCtrl.$inject = ['$routeParams', 'PostService', 'CommentService'];

function PostDetailsCtrl($routeParams, Post, Comment){
	var vm = this;


	var postId = $routeParams.postId;
	
	Post.get(postId)
		.then(function(response){
			vm.post = response.data;
		});

	Comment.getFromPost(postId)
		.then(function(response){
			vm.comments = response.data;
		});
}