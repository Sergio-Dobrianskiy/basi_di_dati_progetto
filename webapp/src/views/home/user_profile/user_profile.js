
var utente;

function getUtente() {
    var utente = null;
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        // console.log(JSON.stringify("header data " + data[0]));
        utente = new Utente(data[0])
        fixBackBtn(data[0]);
    })
    JSON.stringify(utente);
    return utente;
}

function fixBackBtn(user) {
    var ruolo = user["ruolo"]
    const backBtn = document.querySelector("#button_back");
    backBtn.innerHTML = '<a href="/' + ruolo + '_home">Back</a>'
}

console.log(getUtente())

class Utente {
    constructor(utente) {
        this.id_user = utente["id_user"];
        this.username = utente["username"];
        this.nome = utente["nome"];
        this.cognome = utente["cognome"];
        this.username = utente["username"];
        this.password = utente["password"];
        this.indirizzo = utente["indirizzo"];
        this.telefono = utente["telefono"];
        this.email = utente["email"];
        this.cf = utente["cf"];
        this.ruolo = utente["ruolo"];
        console.log("UTENTE")
        console.log(JSON.stringify(utente));
        console.log(this.id_user, this.nome, this.cognome, this.username, this.password, this.indirizzo, this.numeroTelefono, this.email, this.ruolo)
        this.popolaCampi()
        
        const addBtn = document.querySelector("#button_edit");

        addBtn.onclick = (e) => {
            e.preventDefault();
            console.log("CLICK")
            this.editProfile();
}
    }

    popolaCampi() {
        // document.querySelector('#id_user_reg').value = this.id_user;
        document.querySelector('#username_reg').value = this.username;
        document.querySelector('#nome_reg').value = this.nome;
        document.querySelector('#cognome_reg').value = this.cognome;
        document.querySelector('#password_reg').value = this.password;
        document.querySelector('#indirizzo_reg').value = this.indirizzo;
        document.querySelector('#telefono_reg').value = this.telefono;
        document.querySelector('#email_reg').value = this.email;
        document.querySelector('#cf_reg').value = this.cf;
        
    }

    editProfile() {
        console.log("EDITING")
    // const id_userInput = document.querySelector('#id_user_reg');
        const usernameInput = document.querySelector('#username_reg');
        const nomeInput = document.querySelector('#nome_reg');
        const cognomeInput = document.querySelector('#cognome_reg');
        const emailInput = document.querySelector('#email_reg');
        const passwordInput = document.querySelector('#password_reg');
        const indirizzoInput = document.querySelector('#indirizzo_reg');
        const telefonoInput = document.querySelector('#telefono_reg');
        const cfInput = document.querySelector('#cf_reg');
        
        const id_user = this.id_user;
        const username = usernameInput.value;
        const nome = nomeInput.value;
        const cognome = cognomeInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const indirizzo = indirizzoInput.value;
        const telefono = telefonoInput.value;
        const cf = cfInput.value;

        if (false) {
            // TODO ADD CHECK UNIQUE FIELDS
        } else {

            console.log("ID", id_user)
            fetch('http://localhost:5000/api/edit_user', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ 
                    id_user : id_user,
                    username : username,
                    nome : nome,
                    cognome : cognome,
                    email : email,
                    password : password,
                    indirizzo : indirizzo,
                    telefono : telefono, 
                    cf : cf
                    
                })
            })
            .then(response => response.json())
            .then(data => this.manageResponse(data['data']))
            .catch(error => {
                console.error("C'è stato un problema: ", error);
            });
        }
    }



    manageResponse(data) {
        console.log(JSON.stringify(data))
        console.log(data["fail"])
        if (data["fail"] === undefined){
            // var ruolo = data["id_ruolo"];
            // if (ruolo == 1) {
            //     document.location.href = "http://localhost:5000/admin_home"
            // } else if (ruolo == 2) {
            //     document.location.href = "http://localhost:5000/fornitore_home"
            // } else if (ruolo == 3) {
            //     document.location.href = "http://localhost:5000/cliente_home"
            // }
            
            // soluzione più facile per la sessione 
            document.location.href = "http://localhost:5000/login"
        } else {
            // TODO: sistemare errori POST creazione utente 
            alert(data["fail"]["sqlMessage"])
        }
    }
}


