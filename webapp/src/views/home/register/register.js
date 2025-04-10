const addBtn = document.querySelector("#button_reg");

addBtn.onclick = function (e){
    e.preventDefault();
    console.log("CLICK")

    const usernameInput = document.querySelector('#username_reg');
    const nomeInput = document.querySelector('#nome_reg');
    const cognomeInput = document.querySelector('#cognome_reg');
    const emailInput = document.querySelector('#email_reg');
    const passwordInput = document.querySelector('#password_reg');
    const roleInput = document.querySelector('#role_reg');
    
    const username = usernameInput.value;
    const nome = nomeInput.value;
    const cognome = cognomeInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;
    // nameInput.value = "";

    if (username === "" || nome === "" || cognome === "" || email === "" || password === "" || role === "") {
        alert("INSERIRE I DATI ")
    } else {

        
        fetch('http://localhost:5000/api/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                username : username,
                nome : nome,
                cognome : cognome,
                email : email,
                password : password,
                id_ruolo : role
            })
        })
        .then(response => response.json())
        .then(data => manageResponse(data['data']))
        .catch(error => {
            console.error("C'è stato un problema: ", error);
        });
    }
}

function manageResponse(data) {
    console.log(JSON.stringify(data))
    console.log(data["fail"])
    if (data["fail"] === undefined){
        document.location.href = "http://localhost:5000/login"
    } else {
        // TODO: sistemare errori POST creazione utente 
        alert(data["fail"]["sqlMessage"])
    }
}