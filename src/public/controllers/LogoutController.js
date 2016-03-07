digits.controller('LogoutCtrl', function LogoutCtrl($http, $scope, $stateParams, $location, $rootScope, AuthService) {
	$scope.logout = function(){
	$rootScope.currentUser = '';
	window.location = '/';

	 AuthService.logout()
	 .then(function(){
 				$scope.disabled = false;
	})
	 .catch(function(){
 				$scope.disabled = false;
	 })
};
});
