
document.querySelector('#update-carte-btn').onclick = () => { getCarteUtente() };



function getCarteUtente() {
    console.log("getIdUtente")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        // getCarteUtente(data[0]["id_user"]);
//     })
// }

// function getCarteUtente(id_user) {
//     console.log("getCarteUtente " + id_user)
    fetch('http://localhost:5000/api/getCarteUtente/' + data[0]["id_user"])
        .then(response => response.json())
        .then(data => loadCarteTable(data['data']));
    })
}

function loadCarteTable(data) {
    
    console.log(JSON.stringify(data));
    
    const table = document.querySelector('table tbody');

    if (! data || data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach((user) => {
        // console.log(utente)
        var numero = user['num_carta_credito'];
        var nome = convertToTitleCase(user['nome']);
        var cognome = convertToTitleCase(user['cognome']);
        var mese = user['mese_scadenza'];
        var anno = user['anno_scadenza'];
        // var id_user = user['id_user'];
        var scadenza = `${mese}/${anno}`
        // var nome = convertToTitleCase(nome)
        // var cognome = convertToTitleCase(cognome)
        
        tableHtml += "<tr>";
        tableHtml += `<td>${numero}</td>`;
        tableHtml += `<td>${nome}</td>`;
        tableHtml += `<td>${cognome}</td>`;
        tableHtml += `<td>${scadenza}</td>`;
        tableHtml += `<td><button class="edit-row-btn btn btn-danger" onclick="deleteCreditCard(${numero})")>Cancella</td>`
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

// *******************************
// ***********REGISTRA NUOVA CARTA
// *******************************

const addBtn = document.querySelector("#button_reg");

addBtn.onclick = (e) => {
    e.preventDefault();
    console.log("CLICK")

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
        // nameInput.value = "";

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
    console.log(JSON.stringify(data))
    console.log(data["fail"])
    if (data["fail"] === undefined){
        getCarteUtente()
    } else {
        alert(data["fail"]["sqlMessage"])
    }
}


// *******************************
// ***********CANCELLA CARTA
// *******************************


function deleteCreditCard(numero) {
    console.log("Cancella " + numero)
    
    fetch('http://localhost:5000/api/deleteCreditCard', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ numero : numero})
    })
        .then(response => response.json())
        .then(getCarteUtente())
        // .then(response => console.log(response)) 
        // .then(data => insertRowIntoTable(data['data']));
}