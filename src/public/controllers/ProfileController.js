digits.controller('ProfileCtrl', function ProfileCtrl($http, $stateParams, $scope) {
	  $http.get('/Jinglrs/' + $stateParams.JinglrId).then(function(response){
	  	console.log(response.data)
      $scope.jinglr = response.data;
	});
});
