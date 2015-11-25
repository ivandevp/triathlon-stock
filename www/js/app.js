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
		.when('/stock/:sku/:size', {
			templateUrl: 'views/stock.html'
		})
		.when('/config', {
			templateUrl: 'views/config.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);