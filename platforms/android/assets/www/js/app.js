var app = angular.module('triathlonApp', []);

app.controller('mainController', function($scope, $http) {
	$scope.message = 'Holaaa!';
	$scope.user.pin = '';
	$scope.user.login = function(user) {
		console.log("User : " + user);
		var response = $http.get("http://192.168.1.40/tapi/api/employee/" + user);
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