digits.controller('MyProfileCtrl', function MyProfileCtrl($http, $rootScope, $scope) {
	  $http.get('/Jinglrs/' + $rootScope.currentUser._id).then(function(response){
	  	console.log(response.data)
      $scope.jinglr = response.data;
	});
});
