document.querySelector('#update-serviziAcquistati-btn').onclick = () => { getAcquisti() };
function getAcquisti() {
    console.log("Aggiorna acquisti")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];
        fetch('http://localhost:5000/api/getAcquisti/'+ id_user)
            .then(response => response.json())
            .then(data => loadTableAcquisti(data['data']));
    })
}

function loadTableAcquisti(data) {
    console.log(JSON.stringify(data));


    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach((acquisto) => {
        var data_acquisto = new Date(acquisto['data_acquisto']).toLocaleDateString('en-GB');
        var prezzo_pagato = acquisto['prezzo_pagato'];
        var nome_servizio = acquisto['nome_servizio'];
        var num_carta_credito = acquisto['num_carta_credito'];
        var id_city_card = acquisto['id_city_card'];

        tableHtml += "<tr>";
        tableHtml += `<td>${data_acquisto}</td>`;
        tableHtml += `<td>${prezzo_pagato}</td>`;
        tableHtml += `<td>${nome_servizio}</td>`;
        tableHtml += `<td>${num_carta_credito}</td>`;
        tableHtml += `<td>${id_city_card}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};
