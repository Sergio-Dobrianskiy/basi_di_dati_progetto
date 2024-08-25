const addBtn = document.querySelector("#button_check_in");

addBtn.onclick = function (e) {
    e.preventDefault();
    const codice_mezzo = document.querySelector('#codice_mezzo').value;
    const stato_checkIn = document.querySelector('#stato_checkIn').value;

    if (codice_mezzo === "") {
        alert("INSERIRE I DATI ")
    } else {

        
        fetch('http://localhost:5000/api/user/')
        .then(response => response.json())
        .then(utente => {
            return utente[0]["id_user"];
        })
        .then(id_user => {
            fetch('http://localhost:5000/api/makeCheckIn', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ 
                    id_user : id_user,
                    codice_mezzo : codice_mezzo,
                    stato_checkIn : stato_checkIn
                })
            })
            .then(response => response.json())
            .then(getListaCheckIn())
            .catch(error => {
                console.error("C'è stato un problema: ", error);
            });
        })
    }
}



// *************************************
// **************************Check-in list
// *************************************

document.querySelector('#update-checkIn-btn').onclick = () => { getListaCheckIn() };

function getListaCheckIn() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getListaCheckIn/' + user[0]["id_user"])
            .then(response => response.json())
            // .then(data => console.log("RESULTS", JSON.stringify(data)))
            .then(checkIn => loadCheckInTable(checkIn['data']));
    })
}

function loadCheckInTable(data) {
    const table = document.querySelector('table tbody');
    if (! data || data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach((checkIn) => {
        var stato = checkIn['id_stato'];
        var descrizione_stato = checkIn['descrizione_stato'];
        var orario = new Date(checkIn['orario_convalida']).toLocaleDateString('en-GB');
        var id_mezzo = checkIn['id_mezzo'];
        var descrizione_mezzo = checkIn['descrizione_mezzo'];

        
        if (stato == 1) {
            var rigaStato = `<td>✔️</td>`
        } else {
            var rigaStato = `<td>${descrizione_stato}</td>`
        }

        tableHtml += "<tr>";
        tableHtml += rigaStato;
        tableHtml += `<td>${orario}</td>`;
        tableHtml += `<td>${id_mezzo}</td>`;
        tableHtml += `<td>${descrizione_mezzo}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};


// function manageResponse(data) {
//     console.log(JSON.stringify(data))
//     console.log(data["fail"])
//     if (data["fail"] === undefined){
//         document.location.href = "http://localhost:5000/login"
//     } else {
//         // TODO: sistemare errori POST creazione utente 
//         alert(data["fail"]["sqlMessage"])
//     }
// }