digits.factory('AuthService', function AuthService($q, $timeout, $http, $rootScope){
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
		$http.post('/Jinglrs', {'username': username, 'password': password, 'jinglr': jinglr})
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