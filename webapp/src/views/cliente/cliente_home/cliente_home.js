getActiveCityCard()

function getActiveCityCard() {
    console.log("getActiveCityCard()")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getActiveCityCard/' + user[0]["id_user"])
            .then(response => response.json())
            .then(carta => activateIfCityCard(carta['data']));
    })
}

function activateIfCityCard(data) {
    if (data.length != 0) {
        document.querySelector('#abbonamento').classList.remove("disabled")
        getActiveSubscription()
    }
}

function getActiveSubscription() {
    console.log("getActiveCityCard()")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(user => {
        fetch('http://localhost:5000/api/getActiveSubscription/' + user[0]["id_user"])
            .then(response => response.json())
            .then(carta => activateIfSubscription(carta['data']));
    })
}

function activateIfSubscription(data) {
    if (data.length != 0) {
        document.querySelector('#abbonamento').classList.add("disabled")
        document.querySelector('#abbonamento').innerHTML = "Abbonamento attivo"
        document.querySelector('#eventi').classList.remove("disabled")
        document.querySelector('#servizi').classList.remove("disabled")
        document.querySelector('#check_in').classList.remove("disabled")
    }
}