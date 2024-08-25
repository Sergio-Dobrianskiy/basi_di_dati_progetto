// ***********************************
// *********** VISUALIZZA CARTE UTENTE
// ***********************************
document.querySelector('#update-citycard-btn').onclick = () => { getCityCardUtente() };

function getCityCardUtente() {
    console.log("Update")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getCityCardUtente/' + user[0]["id_user"])
            .then(response => response.json())
            .then(carte => loadCarteTable(carte['data']));
    })
}

function loadCarteTable(data) {
    const table = document.querySelector('table tbody');
    if (! data || data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach((card) => {
        var numero = card['id_city_card'];
        var emissione = new Date(card['data_emissione']).toLocaleDateString('en-GB');
        var scadenza = new Date(card['data_scadenza']).toLocaleDateString('en-GB');
        var stato = card['stato'];
        
        if (stato == "attiva") {
            var bottone = `<td><button class="edit-row-btn btn btn-danger" onclick="deactivateCreditCards()")>Cancella</td>`
        } else {
            var bottone = `<td></td>`
        }

        tableHtml += "<tr>";
        tableHtml += `<td>${numero}</td>`;
        tableHtml += `<td>${emissione}</td>`;
        tableHtml += `<td>${scadenza}</td>`;
        tableHtml += `<td>${stato}</td>`;
        tableHtml += bottone
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};


// ***********************************
// *********** OTTIENI NUOVA CITYCARD
// ***********************************
const createCityCardBtn = document.querySelector("#create-new-citycard-btn");
createCityCardBtn.onclick = (e) => {
    e.preventDefault();
    deactivateCreditCards(refresh=false)
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(utente => {
        return utente[0]["id_user"];
    })
    .then(id_user => {
        // console.log("First deactivate the old card");
        // deactivateCreditCards();
        console.log("Then create a new one");
        fetch('http://localhost:5000/api/createNewCityCard', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                id_user : id_user
            })
        })
        .then(response => response.json())
        .then(data => manageResponse(data['data']))
        .catch(error => {
            console.error("C'è stato un problema: ", error);
        });
    })
}

function manageResponse(data, refresh=true) {
    if (data["fail"] === undefined){
        if (refresh) getCityCardUtente();
    } else {
        alert(data["fail"]["sqlMessage"])
    }
}

// ***********************************
// *********** DISATTIVA CITYCARD
// ***********************************

function deactivateCreditCards(refresh=true) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(utente => utente[0]["id_user"])
    .then(id_user => {
        fetch('http://localhost:5000/api/deactivateCreditCards', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                id_user : id_user
            })
        })
        .then(response => response.json())
        .then(data => manageResponse(data['data'], refresh=refresh))
        .catch(error => {
            console.error("C'è stato un problema: ", error);
        });
})
}
