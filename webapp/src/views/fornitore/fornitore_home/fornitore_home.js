getAssociatedEnte()

function getAssociatedEnte() {
    console.log("getActiveCityCard()")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getAssociatedEnte/' + user[0]["id_user"])
            .then(response => response.json())
            .then(carta => activateIfAssociated(carta['data']));
    })
}

function activateIfAssociated(data) {
    if (data.length != 0) {
        document.querySelector('#associa_ente').classList.add("disabled")
        document.querySelector('#associa_ente').innerHTML = "Ente associato"
        document.querySelector('#crea_evento').classList.remove("disabled")
        document.querySelector('#crea_servizio').classList.remove("disabled")
        document.querySelector('#statistiche_fornitore').classList.remove("disabled")

        // getActiveSubscription()
    }
}

// function getActiveSubscription() {
//     console.log("getActiveCityCard()")
//     fetch('http://localhost:5000/api/user/')
//     .then(response => response.json())
//     .then(user => {
//         fetch('http://localhost:5000/api/getActiveSubscription/' + user[0]["id_user"])
//             .then(response => response.json())
//             .then(carta => activateIfSubscription(carta['data']));
//     })
// }

// function activateIfSubscription(data) {
//     if (data.length != 0) {
//         document.querySelector('#abbonamento').classList.add("disabled")
//         document.querySelector('#abbonamento').innerHTML = "Abbonamento attivo"
//         document.querySelector('#eventi').classList.remove("disabled")
//         document.querySelector('#servizi').classList.remove("disabled")
//         document.querySelector('#check_in').classList.remove("disabled")
//     }
// }