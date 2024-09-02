const creazioneEventoBtn = document.querySelector("#crea-evento-btn");
creazioneEventoBtn.onclick = (e) => {
    e.preventDefault();
    console.log("creaEvento")
    const nomeEvento = document.querySelector('#nome_evento').value;

    var periodico = document.querySelector('#btn-check-periodico').checked;

    if (periodico === true){
        var lun = document.querySelector('#btn-check-outlined1').checked;
        var mar = document.querySelector('#btn-check-outlined2').checked;
        var mer = document.querySelector('#btn-check-outlined3').checked;
        var gio = document.querySelector('#btn-check-outlined4').checked;
        var ven = document.querySelector('#btn-check-outlined5').checked;
        var sab = document.querySelector('#btn-check-outlined6').checked;
        var dom = document.querySelector('#btn-check-outlined7').checked;

        fetch('http://localhost:5000/api/user/')
        .then(response => response.json())
        .then(data => {
            const id_user = data[0]["id_user"];
            
            
            fetch('http://localhost:5000/api/creazioneEventoPeriodico', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({  id_user : id_user,
                                        nomeEvento : nomeEvento,
                                        lun : lun,
                                        mar : mar,
                                        mer : mer,
                                        gio : gio,
                                        ven : ven,
                                        sab : sab,
                                        dom : dom
                })
            })
                .then(response => response.json())
                .then(data => manageResponse(data['data']))
                .catch(error => {
                    console.error("C'è stato un problema: ", error);
                });
        })
    } else {
        fetch('http://localhost:5000/api/user/')
        .then(response => response.json())
        .then(data => {
            const id_user = data[0]["id_user"];
            
            
            fetch('http://localhost:5000/api/creazioneEventoNonPeriodico', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({  id_user : id_user,
                                        nomeEvento : nomeEvento
                })
            })
                .then(response => response.json())
                .then(data => manageResponse(data['data']))
                .catch(error => {
                    console.error("C'è stato un problema: ", error);
                });
        })
    }
}

function manageResponse(data) {
    if (data["fail"] === undefined){
        alert("Evento creato")
    } else {
        alert(data["fail"]["sqlMessage"])
    }
}

document.querySelector('#btn-check-periodico').onclick = () => { periodico() };

function periodico() {
    var periodico = document.querySelector('#btn-check-periodico').checked;
    console.log("CAMBIA", periodico)
    var div = document.getElementById('checkSettimana');
    if (periodico === true) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}