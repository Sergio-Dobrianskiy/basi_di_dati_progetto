function getUser() {
    fetch('http://localhost:5000/api/user/')
    .then(response => response.json())
    .then(data => setNomeUtente(data[0]))
}

