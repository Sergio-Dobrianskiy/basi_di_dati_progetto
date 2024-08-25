document.querySelector('#update-serviziAcquistati-btn').onclick = () => { getEventi() };
function getEventi() {
    console.log("Aggiorna servizi")
    fetch('http://localhost:5000/api/getServizi')
        .then(response => response.json())
        .then(data => loadUsersTable(data['data']));
}

function loadUsersTable(data) {
    console.log(JSON.stringify(data));
    
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach((servizio) => {
        // console.log(utente)
        // var id_periodo = servizio['id_periodo'];
        var id_servizio = servizio['id_servizio'];
        var nome = convertToTitleCase(servizio['descrizione_servizio']) || servizio['nome_evento'];
        var organizzatore = convertToTitleCase(servizio['organizzatore']) || servizio['organizzatore'];
        var inizio = new Date(servizio['inizio_validita']).toLocaleDateString('en-GB');
        var fine = new Date(servizio['fine_validita']).toLocaleDateString('en-GB');
        var media_recensioni = servizio['media_recensioni'];
        var indirizzo_servizio = servizio['indirizzo_servizio'];
        var prezzo_servizio = servizio['prezzo_servizio'];

        bottoneBannato = `<td><button class="edit-row-btn btn btn-primary" onclick="partecipaEvento(${id_servizio})")>Partecipa</td>`
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${organizzatore}</td>`;
        tableHtml += `<td>${fine}</td>`;
        tableHtml += `<td>${media_recensioni}</td>`;
        tableHtml += `<td>${indirizzo_servizio}</td>`;
        tableHtml += `<td>${prezzo_servizio}</td>`;
        tableHtml += bottoneBannato;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

function compraServizio(id_evento) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];
        
        
        fetch('http://localhost:5000/api/partecipaEvento', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({  id_evento : id_evento,
                                    id_user : id_user
            })
        })
            .then(response => response.json())
            .then(getEventi())
    })
}