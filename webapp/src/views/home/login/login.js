

function login() {
    console.log("LOGIN BTN");
    
    const usernameInput = document.querySelector('#username-lgn');
    const passwordInput = document.querySelector('#password-lgn');
    const username = usernameInput.value;
    const password = passwordInput.value;
    // usernameInput.value = "";
    // passwordInput.value = "";
    console.log("GET")
    var risultato;
    fetch('http://localhost:5000/api/auth/login/' + username + "/" + password)
        .then(response => response.json())
        .then(data => analizzaLogin(data["data"]));

}

function analizzaLogin(data){
    if (data.length === 1) {
        var ruolo = data[0]['id_ruolo']
        if (ruolo == 1) {
            document.location.href = "http://localhost:5000/admin_home"
        } else if (ruolo == 2) {
            document.location.href = "http://localhost:5000/fornitore_home"
        } else if (ruolo == 3) {
            document.location.href = "http://localhost:5000/cliente_home"
        }
    }
}