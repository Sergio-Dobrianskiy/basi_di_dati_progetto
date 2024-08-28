document.querySelector('#update-statisticheAdmin-btn').onclick = () => { getStatisticheAdmin() };

function getStatisticheAdmin() {
    fetch('http://localhost:5000/api/getStatAdmin/')
    .then(response => response.json())
    // .then(response => console.log(JSON.stringify(response)))
    .then(carte => loadStatisticheInTable(carte['data']));
}

function loadStatisticheInTable(data) {
    var stat = data.pop()[0]
    // if (! data || data.length == 0) {
    //     table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    //     return;
    // }
    

    
    var numero_checkin = stat['numero_checkin'];
    var numeroCheckinFalliti = stat['numeroCheckinFalliti'];
    var numeroCityCardAttive = stat['numeroCityCardAttive'];
    var numeroEventiAttivi = stat['numeroEventiAttivi'];
    var numeroServiziAttivi = stat['numeroServiziAttivi'];
    

    document.querySelector('#campo1').innerHTML = "Numero Check-in";
    document.querySelector('#valore1').innerHTML = numero_checkin;

    document.querySelector('#campo2').innerHTML = "Numero Check-in Falliti";
    document.querySelector('#valore2').innerHTML = numeroCheckinFalliti;

    document.querySelector('#campo3').innerHTML = "Numero CityCard Attive";
    document.querySelector('#valore3').innerHTML = numeroCityCardAttive;

    document.querySelector('#campo4').innerHTML = "Numero Eventi Attivi";
    document.querySelector('#valore4').innerHTML = numeroEventiAttivi;

    document.querySelector('#campo5').innerHTML = "Numero Servizi Attivi";
    document.querySelector('#valore5').innerHTML = numeroServiziAttivi;



    table.innerHTML = tableHtml;

}