// ***********************************
// *********** VISUALIZZA CARTE UTENTE
// ***********************************
document.querySelector('#update-citycard-btn').onclick = () => { getCityCardUtente() };

function getCityCardUtente() {
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
        var emissione = new Date(card['data_emissione']).toLocaleDateString();
        var scadenza = new Date(card['data_scadenza']).toLocaleDateString();
        var stato = card['stato'];
        
        tableHtml += "<tr>";
        tableHtml += `<td>${numero}</td>`;
        tableHtml += `<td>${emissione}</td>`;
        tableHtml += `<td>${scadenza}</td>`;
        tableHtml += `<td>${stato}</td>`;
        tableHtml += `<td><button class="edit-row-btn btn btn-danger" onclick="deleteCreditCard(${numero})")>Cancella</td>`
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};