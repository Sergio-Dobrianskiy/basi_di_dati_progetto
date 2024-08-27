document.querySelector('#update-servizi-btn').onclick = () => { getServizi() };
function getServizi() {
    console.log("Aggiorna servizi")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];
        fetch('http://localhost:5000/api/getServizi/'+ id_user)
            .then(response => response.json())
            .then(data => loadUsersTable(data['data']));
    })
}

function loadUsersTable(data) {
    console.log(JSON.stringify(data));
    
    data = data.pop() // pulisco a causa della multi query 
    // data = data[data.length - 1] // pulisco a causa della multi query 

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
        // var inizio = new Date(servizio['inizio_validita']).toLocaleDateString('en-GB');
        var fine = new Date(servizio['fine_validita']).toLocaleDateString('en-GB');
        var media_recensioni = servizio['media_recensioni'];
        var indirizzo_servizio = servizio['indirizzo_servizio'];
        var prezzo_servizio = servizio['prezzo_servizio'];
        var prezzo_scontato = servizio['prezzo_scontato'];

        if (media_recensioni == null) {
            media_recensioni = "Non disponibile"
        } else {
            media_recensioni = "⭐".repeat(Math.floor(parseInt(media_recensioni)));
        }

        var bottoneCompra = `<td><button class="edit-row-btn btn btn-primary" onclick="compraServizio(${id_servizio})")>Compra</td>`
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${organizzatore}</td>`;
        tableHtml += `<td>${fine}</td>`;
        tableHtml += `<td>${media_recensioni}</td>`;
        tableHtml += `<td>${indirizzo_servizio}</td>`;
        tableHtml += `<td>${prezzo_servizio}</td>`;
        tableHtml += `<td>${prezzo_scontato}</td>`;
        tableHtml += bottoneCompra;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

function compraServizio(id_evento) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(response => response)
    .then(data => {
        const id_user = data[0]["id_user"];
        fetch('http://localhost:5000/api/compraServizio', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({  
                                    id_user : id_user,
                                    id_evento : id_evento
            })
        })
            .then(response => response.json())
            .then(getServizi())
            .then(alert("Servizio comprato"))
    })
}