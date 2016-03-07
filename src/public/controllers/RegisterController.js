digits.controller('RegisterCtrl', function RegisterCtrl($scope, $location, AuthService) {
	
	$scope.addJinglr = function (username, password, jinglr) {
		$scope.error = false;
		$scope.disabled = true;
		window.location = '/#/login';

		AuthService.register(username, password, jinglr)
		.then(function(){
			$scope.disabled = false;
			$scope.jinglr = {};
		})
		.catch(function(){
			$scope.error = true;
			$scope.errorMessage = "something went wrong!"
			$scope.disabled = false;
			$scope.jinglr = {}
		})
	}
});

