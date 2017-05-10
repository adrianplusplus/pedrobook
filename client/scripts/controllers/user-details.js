angular
	.module('mainApp')
	.controller('UserDetailsCtrl', UserDetailsCtrl);

UserDetailsCtrl.$inject = ['$routeParams', 'UserService', 'PostService'];

function UserDetailsCtrl($routeParams, User, Post){
	var vm = this;
	User.get($routeParams.userId)
		.then(function(response){
			vm.user = response.data;
		});

	Post.getFromUserId($routeParams.userId)
		.then(function(response){
			vm.posts = response.data;
		});


	vm.enableEditMode = enableEditMode;
	vm.saveUserChanges = saveUserChanges;
	vm.cancelUserChanges = cancelUserChanges;

	function enableEditMode(){
		vm.editMode = true;
		vm.userCopy = angular.copy(vm.user);
 	}

	function saveUserChanges(updatedUser){
		User.update(updatedUser)
			.then(function(response){
				vm.user = vm.userCopy
			});
		vm.editMode = false;
	}

	function cancelUserChanges(){
		vm.editMode = false;
	}
}
