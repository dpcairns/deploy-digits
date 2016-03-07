digits.controller('LoginCtrl', function LoginCtrl($scope, $rootScope, $location, AuthService, $http){
        $scope.login = function(user){
 		$scope.error = false;
 		$scope.disabled = true;
 		AuthService.login(user)
 			.then(function(response){
 				$scope.disabled = false;
 				$scope.user = {};
	 			console.log("here is the response:")
	 			console.log(response)

	 			console.log("here is the response.data")
				console.log(response.data)

	 				})
 			.catch(function(){
 				$scope.error = true;
 				$scope.errorMessage = "Invalid username or password";
 				$scope.disabled = false;
 				$scope.user = {};
 			})
        };  
});