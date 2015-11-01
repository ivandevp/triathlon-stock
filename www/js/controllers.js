(function () {

	angular.module('triathlon.controllers', [])
		.controller('UserController', ['$scope', '$http', '$location', function($scope, $http, $location) {
			$scope.pin = '';
			$scope.login = function() {
				console.log("login!");
				var pin = $scope.pin;
				if (pin == "thnconfig") {
					console.log("configuracion!");
					$location.url('/config');
				} else {
					var general_ip = window.localStorage.getItem("general_ip");
					$http.get("http://" + general_ip + "/stock/api/employee/" + pin)
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
				}
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
			var general_ip = window.localStorage.getItem("general_ip");
			$http.get("http://" + general_ip + "/stock/api/store")
				.success(function(data, status, headers, config) {
					$scope.stores = data;
				})
				.error(function(data, status, headers, config) {
					console.log("Un error ha ocurrido!!");
				});
		}])
		.controller('StockController', ['$scope', '$http', '$location', function($scope, $http, $location) {
			$scope.product = '';
			$scope.price = '';
			$scope.sizes = [];
			$scope.queryStock = function() {
				var general_ip = window.localStorage.getItem("general_ip");
				$http.get("http://" + general_ip + "/stock/api/product/" + $scope.product + "/1")
					.success(function(data, status, headers, config) {
						if (data != null) {
							$scope.price = data[0].RetailPrice;
							$scope.description = data[0].ProductDescription;
							$scope.promo = (data[0].PromoPrice == null) ? "No hay promoción disponible" : data[0].PromoPrice;
							$scope.webproduct = (data[0].WebProduct == 0) ? "No disponible en Web." : "Disponible en web";
							$scope.sizes = data;
						} else {
							navigator.notification.alert("Producto no existe");
						}
					})
					.error(function(data, status, headers, config) {
						console.log("Error");
					});
			};
			$scope.searchStock = function(sku, size) {
				$location.url('/stock/' + sku + '/' + size);
			};
		}])
		.controller('SKUController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
			var sku = $routeParams.sku;
			$scope.sku = sku;
			var size = $routeParams.size;
			$scope.size = size;
			var general_ip = window.localStorage.getItem("general_ip");
			$http.get("http://" + general_ip + "/stock/api/product/" + sku)
				.success(function(data, status, headers, config) {
					$scope.stores = data;					
				})
				.error(function(data, status, headers, config) {
					console.log("Error");
				});
			$scope.goBack = function() {
				//history.go(-1);
				navigator.app.backHistory();
			};
		}])
		.controller('ConfigController', ['$scope', function($scope) {
			var general_ip = window.localStorage.getItem("general_ip");
			var local_ip = window.localStorage.getItem("local_ip");
			var store_no = window.localStorage.getItem("store_no");
			$scope.general_ip = general_ip == "undefined" ? "" : general_ip;
			$scope.local_ip = local_ip == "undefined" ? "" : local_ip;
			$scope.store_no = store_no == "undefined" ? "" : store_no;
			$scope.saveSettings = function() {
				console.log("holaaa!");
				var form_general_ip = $scope.general_ip;
				var form_local_ip = $scope.local_ip;
				var form_store_no = $scope.store_no;
				console.log(form_general_ip);
				console.log(form_local_ip);
				console.log(form_store_no);
				if (form_general_ip == null || form_local_ip == null || form_store_no == null) {
					navigator.notification.alert("Debe ingresar todos los campos.");
				} else {
					window.localStorage.setItem("general_ip", $scope.general_ip);
					window.localStorage.setItem("local_ip", $scope.local_ip);
					window.localStorage.setItem("store_no", $scope.store_no);
					navigator.notification.alert("Configuración guardada correctamente.");
				}
			};
		}]);
})();