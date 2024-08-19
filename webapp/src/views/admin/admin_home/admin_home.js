// import { setNomeUtente } from "../../common/utils.js"

// const utils = require("../../../common/utils.js");

function getUser() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => setNomeUtente(data[0]))
}

// function setNomeUtente() {
//     fetch('http://localhost:5000/api/user/')
//     .then(response => response.json())
//     .then(data => {
//         if (data[0]["nome"] != null) {
//             $("#salutoUtente").text(`Benvenuto ${data[0]["nome"]}`)
//         }
//     })
// }
// setNomeUtente();

