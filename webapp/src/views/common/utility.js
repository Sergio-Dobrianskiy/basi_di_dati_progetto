function setNomeUtente() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => {
        if (data[0]["nome"] != null) {
            $("#salutoUtente").text(`Benvenuto ` + convertToTitleCase(data[0]["nome"]))
        }
    })
}

function convertToTitleCase(str) {
    if (!str) {
        return ""
    }
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}
setNomeUtente()

function logout() {
    fetch('http://localhost:5000/api/logout/')
        .then(console.log("Logout effettuato"))
}