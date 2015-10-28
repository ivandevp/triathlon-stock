var app = angular.module('triathlonApp', [
	'ngRoute',
	'ui.bootstrap',
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
		.otherwise({
			redirectTo: '/'
		});
}]);