const creazioneEventoBtn = document.querySelector("#crea-evento-btn");
creazioneEventoBtn.onclick = (e) => {
    e.preventDefault();
    console.log("creaEvento")
    const nomeEvento = document.querySelector('#nome_evento').value;
    const numero_pertecipanti = document.querySelector('#numero_pertecipanti').value;
    
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
        
        
        fetch('http://localhost:5000/api/creazioneEvento', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({  id_user : id_user,
                                    nomeEvento : nomeEvento,
                                    numero_pertecipanti : numero_pertecipanti,
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
}

function manageResponse(data) {
    if (data["fail"] === undefined){
        alert("Evento creato")
    } else {
        alert(data["fail"]["sqlMessage"])
    }
}