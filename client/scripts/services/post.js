angular
	.module('mainApp')
	.factory('PostService', PostService);

PostService.$inject = ['$http','BE_URL', 'UserService', '$q'];

function PostService($http, BE_URL, User, $q){
	var endpoint=BE_URL +'/posts'
	var factory =  {
		get:get,
		getAll: getAll,
		getFromUserId:getFromUserId,
		// 'cache' to only request once per page refresh('persist changes on other pages')
		posts:null,
		// 'hashtable': used along with posts to find a specific post in O(1) time from the posts array
		postIdHash:null
	};

	return factory;

	// get a single post given a postId
	function get(postId){
		var promise = null;

		// use from factory if post was requested before
		if(factory.posts){
			var deferred = $q.defer();
			var data = factory.posts[factory.postIdHash[postId]];
			deferred.resolve({data:data});
			promise =  deferred.promise;
		}else{
			promise = $http.get(endpoint+'/'+postId);
		}

		var post = null;
		promise.then(function(response){
			post = response.data;
			return User.get(response.data.userId);
		}).then(function(response){
			post.user = response.data
		});

		return promise;
	}

	// get all available posts
	function getAll(){
		var promise =  null;

		// use from factory if posts were requested before 
		if(factory.posts){
			var deferred = $q.defer();
			var data = factory.posts;
			deferred.resolve({data:data});
			promise = deferred.promise;
		}else{
			promise = $http.get(endpoint);
		}

		promise.then(function(response){
			// store in factory and create index
			factory.posts = response.data;
			factory.postIdHash = {};
			angular.forEach(factory.posts, function(post,$index){
				factory.postIdHash[post.id] = $index;
			});

			return User.getAll();
		}).then(function(response){
			angular.forEach(factory.posts, function(post){
				post.user = User.users[User.userIdHash[post.userId]];
			});
		});
		return promise;
	}

	// get posts from a specific user given by the userId
	function getFromUserId(userId){
		var qs = {userId:userId};
		return $http.get(endpoint, {params:qs});
	}

}