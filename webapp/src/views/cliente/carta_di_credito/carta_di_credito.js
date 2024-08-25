
// *******************************
// *********** VISUALIZZA CARTE UTENTE
// *******************************
document.querySelector('#update-carte-btn').onclick = () => { getCarteUtente() };

function getCarteUtente() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getCarteUtente/' + user[0]["id_user"])
            .then(response => response.json())
            // .then(response => console.log(JSON.stringify(response)))
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
};

// *******************************
// ***********REGISTRA NUOVA CARTA
// *******************************
const createCreditCardBtn = document.querySelector("#button_reg");
createCreditCardBtn.onclick = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];


        const numeroCartaInput = document.querySelector('#numero_carta_reg');
        const cognomeCartaInput = document.querySelector('#cognome_carta_reg');
        const nomeCartaInput = document.querySelector('#nome_carta_reg');
        const meseCartaInput = document.querySelector('#mese_carta_reg');
        const annoCartaInput = document.querySelector('#anno_carta_reg');
        
        const numero = numeroCartaInput.value;
        const nome = nomeCartaInput.value;
        const cognome = cognomeCartaInput.value;
        const mese = meseCartaInput.value;
        const anno = annoCartaInput.value;

        if (numero === "" || nome === "" || cognome === "" || mese === "" || anno === "" || id_user === "") {
            alert("INSERIRE I DATI ")
        } else {
            fetch('http://localhost:5000/api/registerCreditCard', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ 
                    numero : numero,
                    cognome : cognome,
                    nome : nome,
                    mese : mese,
                    anno : anno,
                    id_user : id_user
                })
            })
            .then(response => response.json())
            .then(data => manageResponse(data['data']))
            .catch(error => {
                console.error("C'è stato un problema: ", error);
            });
        }
    })
}

function manageResponse(data) {
    if (data["fail"] === undefined){
        getCarteUtente()
    } else {
        alert(data["fail"]["sqlMessage"])
    }
}


// *******************************
// *********** CANCELLA CARTA
// *******************************
function deleteCreditCard(numero) {
    fetch('http://localhost:5000/api/deleteCreditCard', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ numero : numero})
    })
        .then(response => response.json())
        .then(getCarteUtente())
}


function setCreditCardPredefinita(num_carta_credito) {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(utente => {
        return utente[0]["id_user"];
    })
    .then(id_user => {
        fetch('http://localhost:5000/api/setCreditCardDefault', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ 
                id_user : id_user,
                num_carta_credito : num_carta_credito
            })
        })
        .then(response => response.json())
        // .then(data => manageResponse(data['data']))
        .then(getCarteUtente())
        .catch(error => {
            console.error("C'è stato un problema: ", error);
        });
    })
}