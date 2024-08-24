document.querySelector('#update-eventi-btn').onclick = () => { getEventi() };
function getEventi() {
    console.log("Aggiorna utenti")

    fetch('http://localhost:5000/api/getEventi')
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

    data.forEach((evento) => {
        // console.log(utente)
        var id_evento = evento['id_evento'];
        var id_periodo = evento['id_periodo'];
        var nome = convertToTitleCase(evento['nome_evento']) || evento['nome_evento'];
        var organizzatore = convertToTitleCase(evento['organizzatore']) || evento['organizzatore'];
        var inizio = new Date(evento['inizio_validita']).toLocaleDateString();
        var fine = new Date(evento['fine_validita']).toLocaleDateString();
        var partecipanti = evento['partecipanti'] == 1;
        var periodico = id_periodo == 0 ? "Evento Singolo" : "Evento periodico";

        bottoneBannato = `<td><button class="edit-row-btn btn btn-primary" onclick="partecipaEvento(${id_evento})")>Partecipa</td>`
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${organizzatore}</td>`;
        tableHtml += `<td>${fine}</td>`;
        tableHtml += `<td>${periodico}</td>`;
        tableHtml += `<td>${partecipanti}</td>`;
        tableHtml += bottoneBannato;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

function partecipaEvento(id_evento) {
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