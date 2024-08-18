const express = require('express');     // web framework per Node.js 
const route = require('./routes/route');
const app = express();
const cors = require('cors');           // chiamate api da fe a be
const dotenv = require('dotenv');       // variabili di configurazione
dotenv.config();
const dbService = require('./dbService');
const path = require('path');

app.use(cors());                        // riceve le chiamate da fe e le manda a be
app.use(express.json());                // per mandare le chiamate in formato json
app.use(express.urlencoded({ extended : false })); // non manda form data
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
// Static Files
console.log(__dirname)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
// app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/js', express.static(path.join(__dirname, '/views')));
app.use('/components', express.static(path.join(__dirname, '/components')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));


app.use('/', route);
app.use('/home', route);
app.use('/login', route);
app.use('/register', route);
app.use('/test', route);
app.use('/indice_dev', route);

// CLIENTE
app.use('/cliente_home', route);
app.use('/abbonamento', route);
app.use('/acquisti', route);
app.use('/carta_di_credito', route);
app.use('/check_in', route);
app.use('/citycard', route);
app.use('/eventi', route);
app.use('/servizi', route);

//FORNITORE
app.use('/fornitore_home', route);
app.use('/associa_ente', route);
app.use('/crea_ente', route);
app.use('/crea_servizio', route);
app.use('/statistiche_eventi', route);
app.use('/statistiche_saldo', route);
app.use('/statistiche_servizi', route);

// ADMIN
app.use('/admin_home', route);
app.use('/lista_enti', route);
app.use('/lista_user', route);
app.use('/statistiche_admin', route);

// create
app.post('/api/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});



// read
app.get('/api/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getUsers', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUsers();
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

// update
app.patch('/api/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
        .then(data => response.json({success : data}))
        .catch(err => console.log(err));
});

app.patch('/api/ban', (request, response) => {
    console.log("api/ban in api.js")
    const { id_user } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.ban(id_user);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

// delete
app.delete('/api/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/api/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .then(data => console.log(JSON.stringify(data)))
    .catch(err => console.log(err));
})

// avvio l'app alla porta indica in .env
app.listen(process.env.PORT, () => console.log('app is running'));




app.get('/api/auth/login/:username/:password', (request, response) => {
    console.log("app.js POST LOGIN")
    const { username, password } = request.params;
    console.log(username, password)
    const db = dbService.getDbServiceInstance();
    
    const result = db.login(username, password);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

