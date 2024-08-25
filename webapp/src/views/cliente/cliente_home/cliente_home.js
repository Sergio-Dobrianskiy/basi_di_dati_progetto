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
    }
}

getActiveCityCard()