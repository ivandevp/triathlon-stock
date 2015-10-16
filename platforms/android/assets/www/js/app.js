var app = angular.module('triathlonApp', [
	'ngRoute',
	'triathlon.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/login.html'
		})
		.when('/home', {
			templateUrl: 'views/home.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);