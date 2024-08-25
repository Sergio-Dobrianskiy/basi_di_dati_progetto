document.querySelector('#update-user-btn').onclick = () => { getUsers() };
function getUsers() {
    console.log("Aggiorna utenti")

    fetch('http://localhost:5000/api/getUsers')
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

    data.forEach((utente) => {
        // console.log(utente)
        var id_user = utente['id_user'];
        var nome = utente['nome'];
        var cognome = utente['cognome'];
        var ruolo = utente['ruolo'];
        var email = utente['email'];
        var bannato = utente['bannato'] == 1;
        var testoBannato = "";
        var bottoneBannato = ""; 
        
        if (!bannato) {
            testoBannato = "Attivo"
            bottoneBannato = `<td><button class="edit-row-btn btn btn-danger" onclick="ban(${id_user})")>Banna</td>`
        } else {
            testoBannato = "Bannato"
            bottoneBannato = `<td><button class="edit-row-btn btn btn-success" onclick="ban(${id_user})")>Attiva</td>`
            // bottoneBannato = `<td><button class="edit-row-btn btn btn-success" onclick="unban(${id_user})")>Attiva</td>`
        }
        
        tableHtml += "<tr>";
        tableHtml += `<td>${ruolo}</td>`;
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${cognome}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${testoBannato}</td>`;
        tableHtml += bottoneBannato;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

function ban(id_user) {
    console.log("BANN " + id_user)
    
    fetch('http://localhost:5000/api/ban', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ id_user : id_user})
    })
        .then(response => response.json())
        .then(getUsers())
        // .then(response => console.log(response)) 
        // .then(data => insertRowIntoTable(data['data']));
}

function unban(id_user) {
    console.log("UNBANN " + id_user)
}