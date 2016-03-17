digits.factory('AuthService', function AuthService($q, $timeout, $http, $rootScope, Flash){
	var user = null;
	return (
		{
			isLoggedIn: isLoggedIn,
			getUserStatus: getUserStatus,
			login: login,
			logout: logout,
			register: register
			}
		);
	function isLoggedIn(){
		if($rootScope.currentUser){
			return true;
		} else{
			return false;
		}
	}
	function getUserStatus(){
		return user;
		}

	function login(user){
		var deferred = $q.defer();
		$http.post('/login', user)
			.success(function (jinglr, status){
				$rootScope.currentUser = jinglr;
				window.location = '/#/JinglrsNearby';

				if(status === 200 && jinglr.status){
					deferred.resolve();
				} else{
					user = false;
					deferred.reject();
				}
			})
			.error(function(jinglr){
				user = false;
				var message = '<strong>Boo!</strong> You didn\'t put the right stuff in there. Try again.';
                        	var id = Flash.create('danger', message, 7000, {class: 'custom-class', id: 'custom-id'}, true);
                        	console.log("flash should go now")
				deferred.reject();
			})

			return deferred.promise;

	}

	function logout(){
		var deferred = $q.defer()
		$http.get('/logout')
		.success(function(data){
			user=false;
			deffered.resolve();
		})
		.error(function(data){
			user = false;
			deferred.reject();
		});
		return deferred.promise
	}
	function register(username, password, jinglr){
		var deferred = $q.defer();
		$http.post('/Jinglrs', {'username': username, 'password': password, 'cute': cute, 'jinglr': jinglr})
		.success(function(data, status){
			window.location = '/#/'
			if(status === 200 & data.status){
				deferred.resolve();

			}else{
				deferred.reject();

			}
		})
		.error(function(data){
			deferred.reject();
		})
		return deferred.promise
	}

});
