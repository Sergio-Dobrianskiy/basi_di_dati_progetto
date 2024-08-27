const cercaBtn = document.querySelector("#button_crea_servizio").onclick = function (e) {
    e.preventDefault();
    creaServizio()
};

function creaServizio() {
    const descrizione_servizio = document.querySelector('#descrizione_servizio').value;
    const indirizzo_servizio = document.querySelector('#indirizzo_servizio').value;
    const prezzo_servizio = document.querySelector('#prezzo_servizio').value;
    

    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];

        fetch('http://localhost:5000/api/creaServizio', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                id_user : id_user,
                descrizione_servizio : descrizione_servizio,
                indirizzo_servizio : indirizzo_servizio,
                prezzo_servizio : prezzo_servizio
            })
        })
        .then(response => response.json())
        .then(data => manageResponse(data['data']))
        .catch(error => {
            console.error("C'è stato un problema: ", error);
        });
    })
}


function manageResponse(data) {
    console.log(JSON.stringify(data))
    console.log(data["fail"])
    if (data["fail"] === undefined){
        document.location.href = "http://localhost:5000/fornitore_home"
    } else {
        // TODO: sistemare errori POST creazione utente 
        alert(data["fail"]["sqlMessage"])
    }
}