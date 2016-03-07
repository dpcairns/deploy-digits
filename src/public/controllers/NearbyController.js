digits.controller('NearbyCtrl', function NearbyCtrl($scope, $http, $location, $rootScope)
{

	refresh = function(){
    $http.get('/Jinglrs').then(function(response){
    $scope.jinglrs = response.data;
    });
};
    console.log($rootScope.currentUser)
    console.log("here is the current user:")
    console.log($rootScope.currentUser.username)
    console.log("their digits are:")
    console.log($rootScope.currentUser.digits)
    $http.get('/Jinglrs').then(function(response){
    $scope.jinglrs = response.data;
    var currentUserDigits = $rootScope.currentUser.digits
    $scope.showMatches = function (desiredMatches){
        var arrayOfPings = [];
        $scope.jinglrs.forEach(function(jinglr){
            thisJinglrObject = {
            };
            
            thisJinglrObject.username = jinglr.username
            thisJinglrObject.digits = jinglr.digits
            thisJinglrObject.superInteger = jinglr.superInteger
            thisJinglrObject.cute = jinglr.cute
            thisJinglrObject.numberOfMatches = 0

            jinglr.digits.forEach(function(digit){
                for (i=0; i<7; i++){
                if(digit === currentUserDigits[i]){
                     thisJinglrObject.numberOfMatches++
                     }
                   }
         
                });
       if(thisJinglrObject.numberOfMatches>desiredMatches){
                    arrayOfPings.push(thisJinglrObject)         
            }
        });
        $scope.matchingJinglrs = arrayOfPings//    arrayOfPings.filter(function(numberOfMatches, desiredMatches){
//        return numberOfMatches >= desiredMatches
    };
  });
    $scope.remove = function(id){
    	$http.delete('/Jinglrs/' +id).then(function(response){
    	refresh();
    	})
    }

});

  