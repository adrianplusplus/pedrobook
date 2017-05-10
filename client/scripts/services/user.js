angular
	.module('mainApp')
	.service('UserService', UserService);

UserService.$inject = ['$http', 'BE_URL', 'toastr', '$q'];

function UserService($http,BE_URL, toastr, $q){
	var endpoint = BE_URL + '/users';

	var factory = {
		get:get,
		getAll:getAll,
		update:update,
		// 'cache' to only request once per page refresh('persist changes on other pages')
		users:null,
		// 'hashtable': used along with users to find a specific user in O(1) time from the users array
		userIdHash:null

	};

	return factory;


	// get single user given a userId
	function get(userId){
		var promise = null;

		// use from factory if users was requested before
		if(factory.users){
			var deferred = $q.defer();
			var data = factory.users[factory.userIdHash[userId]];
			deferred.resolve({data:data});
			promise =  deferred.promise;
		}else{
			promise = $http.get(endpoint+'/'+userId);
		}

		return promise;
	}

	// get all available users
	function getAll(){
		var promise  = null;

		// use from factory if users were requested before 
		if(factory.users){
			var deferred = $q.defer();
			var data = factory.users;
			deferred.resolve({data:data});
			promise = deferred.promise;
		}else{
			promise =  $http.get(endpoint);
		}

 		promise.then(function(response){
			// store in factory and create index
			factory.users = response.data;
			factory.userIdHash = {};
			angular.forEach(factory.users, function(user,$index){
				factory.userIdHash[user.id] = $index;
			});
		});

		return promise;
	}

	// update user info
	function update(updatedInfo){
		var promise = $http.put(endpoint+'/'+updatedInfo.id, updatedInfo);
		promise
			.then(function(){
				// update stored factory copy to 'persist' the change on other pages
				if(factory.users){
					factory.users[factory.userIdHash[updatedInfo.id]] =updatedInfo; 
				}
				toastr.success("Profile was updated ", 'Success');
			})
			.catch(function(){
				toastr.error("Error trying to update. Please try again ", 'Rrror');
			});

		return promise;
	}
}