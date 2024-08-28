document.querySelector('#update-carte-btn').onclick = () => { getStatisticheAdmin() };

function getStatisticheAdmin() {
    fetch('http://localhost:5000/api/getStatisticheAdmin/')
    .then(response => response.json())
    // .then(response => console.log(JSON.stringify(response)))
    .then(carte => loadStatisticheInTable(carte['data']));
}

function loadStatisticheInTable(data) {
    const table = document.querySelector('table tbody');
    if (! data || data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach((card) => {
        var numero = card['num_carta_credito'];
        var nome = convertToTitleCase(card['nome']);
        var cognome = convertToTitleCase(card['cognome']);
        var mese = card['mese_scadenza'];
        var anno = card['anno_scadenza'];
        var predefinita = card['predefinita'];
        var scadenza = `${mese}/${anno}`
        
        if (predefinita == 0) {
            var btnPredefinita = `<td><button class="edit-row-btn btn btn-primary" onclick="setCreditCardPredefinita(${numero})")>Rendi Predefinita</td>`
        } else {
            // var btnPredefinita = `<td>Predefinita</td>`
            var btnPredefinita = `<td>✔️</td>`
        }

        tableHtml += "<tr>";
        tableHtml += `<td>${numero}</td>`;
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${cognome}</td>`;
        tableHtml += `<td>${scadenza}</td>`;
        tableHtml += btnPredefinita;
        tableHtml += `<td><button class="edit-row-btn btn btn-danger" onclick="deleteCreditCard(${numero})")>Cancella</td>`
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

}