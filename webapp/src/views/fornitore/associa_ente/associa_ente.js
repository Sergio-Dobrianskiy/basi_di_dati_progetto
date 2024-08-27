const cercaBtn = document.querySelector("#button_search_ente");

cercaBtn.onclick = function (e) {
    e.preventDefault();
    console.log("CLICK")

    const nome_ente = document.querySelector('#nome_ente').value;
    // if (nome_ente == "") {
    //     nome_ente
    // }
    fetch('http://localhost:5000/api/search_ente/' + nome_ente)
        .then(response => response.json())
        .then(data => loadEntiInTable(data["data"]));
}



function loadEntiInTable(data) {
    const table = document.querySelector('table tbody');
    if (! data || data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach((ente) => {
        var id_ente = ente['id_ente'];
        var nome = ente['nome'];
        var descrizione = ente['descrizione'];

        tableHtml += "<tr>";
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${descrizione}</td>`;
        tableHtml += `<td><button class="edit-row-btn btn btn-primary" onclick="associaEnte(${id_ente})")>Associa</td>`
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};




// *******************************
// *********** ASSOCIA UN ENTE
// *******************************
function associaEnte(id_ente) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];

        fetch('http://localhost:5000/api/associaEnte', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                id_user : id_user,
                id_ente : id_ente
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