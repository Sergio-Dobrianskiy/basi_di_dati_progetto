const addBtn = document.querySelector("#button_crea_ente");

addBtn.onclick = function (e) {
    e.preventDefault();
    const nome_ente = document.querySelector('#nome_ente').value;
    const descrizione_ente = document.querySelector('#descrizione_ente').value;
    const indirizzo_ente = document.querySelector('#indirizzo_ente').value;
    const telefono_ente = document.querySelector('#telefono_ente').value;
    
    if (nome_ente === "", descrizione_ente === "", indirizzo_ente === "", telefono_ente === "") {
        alert("INSERIRE I DATI ")
    } else {

        
        fetch('http://localhost:5000/api/user/')
        .then(response => response.json())
        .then(utente => {
            return utente[0]["id_user"];
        })
        .then(id_user => {
            fetch('http://localhost:5000/api/crea_ente', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ 
                    id_user : id_user,
                    nome_ente : nome_ente,
                    descrizione_ente : descrizione_ente,
                    indirizzo_ente : indirizzo_ente,
                    telefono_ente : telefono_ente
                })
            })
            .then(response => response.json())
            .then(response =>  manageResponse(response))
            .catch(error => {
                console.error("C'è stato un problema: ", error);
            });
        })
    }
}



// *************************************
// *************************************
// *************************************
function manageResponse(data) {
    console.log(JSON.stringify(data))
    if (data["fail"] === undefined){
        document.location.href = "http://localhost:5000/fornitore_home"
    } else {
        // TODO: sistemare errori POST creazione utente 
        alert(data["fail"]["sqlMessage"])
    }
}