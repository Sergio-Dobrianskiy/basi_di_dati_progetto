// document.querySelector('#update-servizi-btn').onclick = () => { getAbbonamenti() };
getAbbonamenti();
function getAbbonamenti() {
    console.log("Aggiorna servizi")
    fetch('http://localhost:5000/api/getListinoAbbonamenti')
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

    data.forEach((sconto) => {
        // console.log(utente)
        // var id_periodo = servizio['id_periodo'];
        var id_listino_abbonamento = sconto['id_listino_abbonamento'];
        var nome = convertToTitleCase(sconto['descrizione_abbonamento']) || sconto['descrizione_abbonamento'];
        var durata = "" + sconto['durata_abbonamento'] + " giorni";
        var percentuale_sconto = "" +  sconto['percentuale_sconto'] + "%";
        var prezzo = sconto['prezzo_abbonamento'];

        var bottoneBannato = `<td><button class="edit-row-btn btn btn-primary" onclick="sottoscriviAbbonamento(${id_listino_abbonamento})")>Compra</td>`
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${durata}</td>`;
        tableHtml += `<td>${percentuale_sconto}</td>`;
        tableHtml += `<td>${prezzo}</td>`;
        tableHtml += bottoneBannato;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

function sottoscriviAbbonamento(id_listino_abbonamento) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];
        
        
        fetch('http://localhost:5000/api/sottoscriviAbbonamento', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({  
                                    id_user : id_user,
                                    id_listino_abbonamento : id_listino_abbonamento
            })
        })
            .then(response => response.json())
            .then(document.location.href = "http://localhost:5000/cliente_home")
    })
}