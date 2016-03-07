var digits = angular.module('digits', ['ui.router', 'ngAnimate', 'ngFlash']);

digits.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
    url: "",
    templateUrl: "/partials/home.html",
    })
  	.state('JinglrsNearby', {
		url:"/JinglrsNearby",
		templateUrl: "/partials/nearby.html",
		controller: "NearbyCtrl",
		resolve: {checkLoggedOut: checkLoggedOut}
	})
	.state('Register', {
		url:"/Register",
		templateUrl: "/partials/register.html",
		controller: "RegisterCtrl"
	});
$stateProvider
	.state('Login', {
		url:"/login",
		templateUrl: "/partials/login.html",
		controller: "LoginCtrl"
	});
$stateProvider
	.state('JinglrProfile', {
		url:"/JinglrProfile:JinglrId",
		templateUrl: "/partials/profile.html",
		controller: "ProfileCtrl",
		resolve: {checkLoggedOut: checkLoggedOut}
		})
$stateProvider
	.state('MyProfile', {
		url:"/MyProfile",
		templateUrl: "/partials/myProfile.html",
		controller: "MyProfileCtrl",
		resolve: {checkLoggedOut: checkLoggedOut}
		})

function checkLoggedOut($q, $state, AuthService, $timeout){
	if(AuthService.isLoggedIn() === false){
			$location.path('/login');
		};
	}
})