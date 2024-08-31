getStatisticheFornitore();
document.querySelector('#update-statisticheFornitore-btn').onclick = () => { getStatisticheFornitore() };

function getStatisticheFornitore() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getStatisticheFornitore/' + user[0]["id_user"])
        .then(response => response.json())
        // .then(response => console.log(JSON.stringify(response)))
        .then(carte => loadStatisticheInTable(carte['data']));
    })
}

function loadStatisticheInTable(data) {
    var stat = data.pop()[0]
    // if (! data || data.length == 0) {
    //     table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    //     return;
    // }
    

    
    var saldo = stat['saldo'];
    var numeroEventiAttivi = stat['numeroEventiAttivi'];
    var numeroServiziAttivi = stat['numeroServiziAttivi'];

    

    document.querySelector('#campo1').innerHTML = "Saldo";
    document.querySelector('#valore1').innerHTML = saldo;

    document.querySelector('#campo2').innerHTML = "Eventi attivi per l'ente";
    document.querySelector('#valore2').innerHTML = numeroEventiAttivi;

    document.querySelector('#campo3').innerHTML = "Eventi servizi per l'ente";
    document.querySelector('#valore3').innerHTML = numeroServiziAttivi;


    table.innerHTML = tableHtml;

}