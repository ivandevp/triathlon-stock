var app = angular.module('triathlonApp', []);

app.controller('mainController', function($scope, $http) {
	$scope.message = 'Holaaa!';
	$scope.pin = '';
	$scope.login = function() {
		var pin = $scope.pin;
		var response = $http.get("http://192.168.1.40/tapi/api/employee/" + pin);
		response.success(function(data, status, headers, config) {
			if (data == null) {
				$scope.message = "Usuario no existe";
                navigator.notification.alert("PIN INCORRECTO");
                console.log("Usuario no existe!!");
            } else {
                navigator.notification.alert("BIENVENIDO =)");
                console.log("Usuario existe!!");
                $scope.message = "Usuario correcto: " + data.FirstName + " " + data.LastName;
            }
		});
		response.error(function(data, status, headers, config) {
			console.log("Un error ha ocurrido!!");
		});
	}

});