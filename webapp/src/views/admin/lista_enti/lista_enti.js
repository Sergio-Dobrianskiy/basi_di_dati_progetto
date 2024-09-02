getEnti()
document.querySelector('#update-enti-btn').onclick = () => { getEnti() };
function getEnti() {
    fetch('http://localhost:5000/api/getEnti')
        .then(response => response.json())
        .then(data => loadEntiTable(data['data']));
}



function loadEntiTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach((ente) => {
        // console.log(utente)
        var nome_ente = ente['nome_ente'];
        var nome = ente['nome_user'];
        var cognome = ente['cognome'];
        var descrizione = ente['descrizione'];
        var contatto = ente['contatto'];
        var creatore = convertToTitleCase(cognome)+ " " + convertToTitleCase(nome)
        var media_recensioni = ente['media_recensioni'];
        var id_ente = ente['id_ente'];
        
        if (media_recensioni == null) {
            media_recensioni = "Non disponibile"
        } else {
            media_recensioni = "⭐".repeat(Math.floor(parseInt(media_recensioni)));
        }

        var btnResetRecensioni = bottoneCompra = `<td><button class="edit-row-btn btn btn-primary" onclick="resetRecensioni(${id_ente})")>Reset Recensioni</td>`
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome_ente}</td>`;
        tableHtml += `<td>${descrizione}</td>`;
        tableHtml += `<td>${contatto}</td>`;
        tableHtml += `<td>${creatore}</td>`;
        tableHtml += `<td>${media_recensioni}</td>`;
        tableHtml += btnResetRecensioni;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};


function resetRecensioni(id_ente) {
    console.log("FUNC", id_ente)
    fetch('http://localhost:5000/api/resetRecensioni', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id_ente : id_ente
        })
    })
        .then(response => response.json())
        .then(getEnti())
        .then(alert("Recensioni resettate"))
}