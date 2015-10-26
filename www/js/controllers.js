(function () {

	angular.module('triathlon.controllers', [])
		.controller('UserController', ['$scope', '$http', '$location', function($scope, $http, $location) {
			$scope.pin = '';
			$scope.login = function() {
				var pin = $scope.pin;
				$http.get("http://181.65.236.235/stock/api/employee/" + pin)
					.success(function(data, status, headers, config) {
						if (data == null) {
			                navigator.notification.alert("PIN INCORRECTO");
			                console.log("Usuario no existe!!");
			            } else {
			                console.log("Usuario existe!!");
			                var user = data.FirstName + " " + data.LastName;
			                window.localStorage.setItem("user", user);
			                $location.url('/home');
			            }
					})
					.error(function(data, status, headers, config) {
						console.log("Un error ha ocurrido!!");
					});
			};
		}])
		.controller('NavBarController', ['$scope', '$location', function($scope, $location) {
			$scope.user = window.localStorage.getItem("user");
			$scope.logout = function() {
				window.localStorage.removeItem("user");
				$location.url('/');
			}
		}])
		.controller('StoreController', ['$scope', '$http', function($scope, $http) {
			$scope.stores = [];
			$http.get("http://181.65.236.235/stock/api/store")
				.success(function(data, status, headers, config) {
					$scope.stores = data;
				})
				.error(function(data, status, headers, config) {
					console.log("Un error ha ocurrido!!");
				});
		}])
		.controller('StockController', ['$scope', '$http', function($scope, $http) {
			$scope.product = '';
			$scope.price = '';
			$scope.sizes = [];
			$scope.queryStock = function() {
				$http.get("http://181.65.236.235/stock/api/product/" + $scope.product + "/1")
					.success(function(data, status, headers, config) {
						console.log(data);
						if (data != null) {
							$scope.price = data[0].RetailPrice;
							$scope.sizes = data;
						} else {
							navigator.notification.alert("Producto no existe");
						}
					})
					.error(function(data, status, headers, config) {
						console.log("Error");
					});
			}
		}]);
})();