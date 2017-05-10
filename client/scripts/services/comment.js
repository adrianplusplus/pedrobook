angular
	.module('mainApp')
	.factory('CommentService', CommentService);

CommentService.$inject = ['$http','BE_URL', 'UserService'];

function CommentService($http, BE_URL, User){
	var endpoint = BE_URL+'/comments';

	return {
		getFromPost:getFromPost,
	};

	// get all comments from a post given a postId
	function getFromPost(postId){
		var qs = {postId:postId};
		var promise = $http.get(endpoint, {params:qs});
		
		return promise;
	}



}