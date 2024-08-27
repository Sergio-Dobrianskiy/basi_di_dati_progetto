document.querySelector('#update-serviziAcquistati-btn').onclick = () => { getAcquisti() };
function getAcquisti() {
    console.log("Aggiorna acquisti")
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        const id_user = data[0]["id_user"];
        fetch('http://localhost:5000/api/getAcquisti/'+ id_user)
            .then(response => response.json())
            .then(data => loadTableAcquisti(data['data']));
    })
}

function loadTableAcquisti(data) {
    console.log(JSON.stringify(data));


    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    var index = 0;
    data.forEach((acquisto) => {
        var data_acquisto = new Date(acquisto['data_acquisto']).toLocaleDateString('en-GB');
        var prezzo_pagato = acquisto['prezzo_pagato'];
        var nome_servizio = acquisto['nome_servizio'];
        var num_carta_credito = acquisto['num_carta_credito'];
        var id_city_card = acquisto['id_city_card'];
        var id_user = acquisto['id_user'];
        var id_servizio = acquisto['id_servizio'];

        var rating = `
            <div class="container">
                <div class="rating">
                    <input type="radio" name="star" id="star5_${index}" onclick="votaServizio(${id_user}, 5, ${id_servizio})"><label for="star5_${index}">&#9733;</label>
                    <input type="radio" name="star" id="star4_${index}" onclick="votaServizio(${id_user}, 4, ${id_servizio})"><label for="star4_${index}">&#9733;</label>
                    <input type="radio" name="star" id="star3_${index}" onclick="votaServizio(${id_user}, 3, ${id_servizio})"><label for="star3_${index}">&#9733;</label>
                    <input type="radio" name="star" id="star2_${index}" onclick="votaServizio(${id_user}, 2, ${id_servizio})"><label for="star2_${index}">&#9733;</label>
                    <input type="radio" name="star" id="star1_${index}" onclick="votaServizio(${id_user}, 1, ${id_servizio})"><label for="star1_${index}">&#9733;</label>
                </div>
            </div>
    
        `

        tableHtml += "<tr>";
        tableHtml += `<td>${data_acquisto}</td>`;
        tableHtml += `<td>${prezzo_pagato}</td>`;
        tableHtml += `<td>${nome_servizio}</td>`;
        tableHtml += `<td>${id_city_card}</td>`;
        tableHtml += `<td>${num_carta_credito}</td>`;
        // tableHtml += `<td>
        //     <div class="container">
        //         <div class="rating">
        //             <input type="radio" name="star" id="star5" onclick="votaServizio('${id_user}', '5', '${id_servizio}')"><label for="star5">&#9733;</label>
        //             <input type="radio" name="star" id="star4" onclick="votaServizio('${id_user}', '4', '${id_servizio}')"><label for="star5">&#9733;</label>
        //             <input type="radio" name="star" id="star3" onclick="votaServizio('${id_user}', '3', '${id_servizio}')"><label for="star3">&#9733;</label>
        //             <input type="radio" name="star" id="star2" onclick="votaServizio('${id_user}', '2', '${id_servizio}')"><label for="star2">&#9733;</label>
        //             <input type="radio" name="star" id="star1" onclick="votaServizio('${id_user}', '1', '${id_servizio}')"><label for="star1">&#9733;</label>
        //         </div>
        //     </div>
        // </td>`;
        tableHtml += `<td>${rating}</td>`;
        // tableHtml += `<td>${id_user}, ${id_servizio}</td>`;
        tableHtml += "</tr>";

        index ++;
        
    });

    table.innerHTML = tableHtml;

};

function votaServizio(id_user, voto, id_servizio){
    console.log(`Schiacciato ${id_user} ${voto} ${id_servizio}`)
    fetch('http://localhost:5000/api/vota', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            id_user : id_user,
            voto : voto,
            id_servizio : id_servizio
        })
    })
    .then(response => response.json())
    // .then(data => manageResponse(data['data']))
    .catch(error => {
        console.error("C'è stato un problema: ", error);
    });
}

const stars = document.querySelectorAll('.rating input');
stars.forEach(star => {
    console.log("STAR")
    star.addEventListener('change', () => {
        const ratingValue = star.class.replace('star', '');
        alert(`You rated ${ratingValue} stars`);
    });
});
