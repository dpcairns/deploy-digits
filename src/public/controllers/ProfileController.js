digits.controller('ProfileCtrl', function ProfileCtrl($http, $rootScope, $stateParams, $scope, Flash) {
	  $http.get('/Jinglrs/' + $stateParams.JinglrId).then(function(response){
	  	console.log(response.data)
    		  $scope.jinglr = response.data;
      	});	  

	  $scope.addMessage = function(message){
	  	if(!message){
	        var message = '<strong>Boo!</strong> You didn\'t use any words. Try again, but with words this time.';
	        var id = Flash.create('danger', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
	        console.log("flash should go now")
	  	}
	  	else{
	   	message.toUserId = $scope.jinglr._id
	   	message.fromUserId = $rootScope.currentUser._id
	    message.toUserName = $scope.jinglr.username
	   	message.fromUserName = $rootScope.currentUser.username
	   	message.timeStamp = Date.now
	  	$http.post('/Messages', message).then(function(response){
	  	console.log(response.data)
		var message = '<strong>Woohoo!</strong> Message sent! Go you!';
       		var id = Flash.create('success', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
	        console.log("flash should go now")

	  	$scope.message = {}
			});
		 } 
		}
 	});


