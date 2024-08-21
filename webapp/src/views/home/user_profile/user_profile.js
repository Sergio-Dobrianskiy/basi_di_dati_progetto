
function getUtente() {
    var utente = null;
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data[0]));
        new Utente(data[0])
        if (data[0] != null) {
            utente = data[0];
        }
    })
    JSON.stringify(utente);
    return utente;
}

class Utente {
    constructor(utente) {
        this.username = utente["username"];
        this.nome = utente["nome"];
        this.cognome = utente["cognome"];
        this.username = utente["username"];
        this.password = utente["password"];
        this.indirizzo = utente["indirizzo"];
        this.numeroTelefono = utente["numeroTelefono"];
        this.email = utente["email"];
        // this.ruolo = utente["ruolo"];
        console.log("UTENTE")
        console.log(this.user_id, this.nome, this.cognome, this.username, this.password, this.indirizzo, this.numeroTelefono, this.email, this.ruolo)
        this.popolaCampi()
    }

    popolaCampi() {
        document.querySelector('#username_reg').value = this.username;
        document.querySelector('#nome_reg').value = this.nome;
        document.querySelector('#cognome_reg').value = this.cognome;
        document.querySelector('#password_reg').value = this.password;
        document.querySelector('#indirizzo_reg').value = this.indirizzo;
        document.querySelector('#numeroTelefono_reg').value = this.numeroTelefono;
        document.querySelector('#email_reg').value = this.email;


        
    }
}


console.log(JSON.stringify(getUtente()))