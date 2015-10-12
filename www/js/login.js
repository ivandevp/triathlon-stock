function login() {
        console.log("Holaaa!!");
        var pin = document.getElementById("pin").value;
        console.log(pin);
        var greet = document.getElementById("greet");
        var url = "http://192.168.1.40/tapi/api/employee/" + pin;
        console.log(url);
        var request = new XMLHttpRequest();
        console.log("Holaaa!!");
        request.open("GET", url, true);
        console.log("Ruta añadida!!");
        request.onreadystatechange = function() {
            console.log("Status: " + request.status);     
            if (request.status == 200 || request.status == 0) {
                var employee = JSON.parse(request.responseText);
                console.log(employee);
                if (employee == null) {
                    greet.innerHTML = "<strong>Usuario no existe!!!</strong>";
                    navigator.notification.alert("PIN INCORRECTO");
                    console.log("Usuario no existe!!");
                } else {
                    greet.innerHTML = "Usuario correcto: " + employee.FirstName + " " + employee.LastName;
                    navigator.notification.alert("BIENVENIDO =)");
                    console.log("Usuario existe!!");
                }
            };
        }
        console.log("Antes de enviar petición!!");
        request.send();
        console.log("Después de enviar petición!!");
}