document.querySelector('#update-enti-btn').onclick = () => { getEnti() };
function getEnti() {
    console.log("Aggiorna getEnti")

    fetch('http://localhost:5000/api/getEnti')
        .then(response => response.json())
        .then(data => loadEntiTable(data['data']));
}



function loadEntiTable(data) {
    // console.log(JSON.stringify(data));
    
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach((ente) => {
        // console.log(utente)
        var nome_ente = ente['ente'];
        var nome = ente['nome'];
        var cognome = ente['cognome'];
        var descrizione = ente['descrizione'];
        var contatto = ente['contatto'];
        var creatore = convertToTitleCase(cognome)+ " " + convertToTitleCase(nome)
        
        
        tableHtml += "<tr>";
        tableHtml += `<td>${nome_ente}</td>`;
        tableHtml += `<td>${descrizione}</td>`;
        tableHtml += `<td>${contatto}</td>`;
        tableHtml += `<td>${creatore}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};