digits.controller('RegisterCtrl', function RegisterCtrl($scope, $location, AuthService, Flash) {
	
	$scope.addJinglr = function (username, password, jinglr) {
		if(!jinglr){
		  var message = '<strong>Huh?!</strong> Try that again, and be really careful this time. Also, maybe try a different username.';
                var id = Flash.create('danger', message, 7000, {class: 'custom-class', id: 'custom-id'}, true);
                console.log("flash should go now")
		}
		cute = $scope.jinglr.cute
		$scope.error = false;
		$scope.disabled = true;
		window.location = '/#/login';

		AuthService.register(username, password, cute, jinglr)
		.then(function(){
			$scope.disabled = false;
			$scope.jinglr = {};
		})
		.catch(function(){
			$scope.error = true;
         	var message = '<strong>Huh?!</strong> Try that again, and be really careful this time. Also, maybe try a different username.';
        	var id = Flash.create('danger', message, 7000, {class: 'custom-class', id: 'custom-id'}, true);
       		console.log("flash should go now")			
       		$scope.disabled = false;
			$scope.jinglr = {}
		})
	}
});


