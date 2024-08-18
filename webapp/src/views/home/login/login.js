

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
    // fetch('http://localhost:5000/api/auth/login', {
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     method: 'GET',
    //     body: JSON.stringify({ username : username, password: password})
    // })
    .then(response => response.json())
    .then(console.log("response "))
    // .then(data => risultato = data)
    // .then(data => console.log("data " + JSON.stringify(risultato["data"])))
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