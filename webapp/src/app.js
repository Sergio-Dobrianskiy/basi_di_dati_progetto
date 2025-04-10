const express = require('express');     // web framework per Node.js 
const app = express();
const path = require('path');
const route = require('./routes/route');
const dbService = require('./dbService');
const cors = require('cors');           // chiamate api da fe a be
const dotenv = require('dotenv');       // variabili di configurazione
dotenv.config();
const session = require('express-session');

app.use(cors());                        // riceve le chiamate da fe e le manda a be
app.use(express.json());                // per mandare le chiamate in formato json
app.use(express.urlencoded({ extended : false })); // non manda form data
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret',
    cookie: {
        sameSite: 'strict'
    }
    }
))


app.set('views', path.join(__dirname, 'views'));
// Static Files
console.log(__dirname)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
// app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/js', express.static(path.join(__dirname, '/views')));
app.use('/common', express.static(path.join(__dirname, '/common')));
app.use('/components', express.static(path.join(__dirname, '/components')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));


app.use('/', route);
app.use('/home', route);
app.use('/login', route);
app.use('/register', route);
app.use('/test', route);
app.use('/indice_dev', route);
app.use('/user_profile', route);

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
app.use('/crea_evento', route);
app.use('/crea_servizio', route);
app.use('/statistiche_fornitore', route);

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



app.post('/api/resetRecensioni', (request, response) => {
    const { id_ente } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.resetRecensioni(id_ente);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/vota', (request, response) => {
    const { id_user, voto, id_servizio } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.vota(id_user, voto, id_servizio);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});
app.post('/api/compraServizio', (request, response) => {
    const { id_user, id_evento } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.compraServizio(id_user, id_evento);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/crea_ente', (request, response) => {
    const { id_user, nome_ente, descrizione, indirizzo_ente, telefono_ente } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.crea_ente(id_user, nome_ente, descrizione, indirizzo_ente, telefono_ente);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/creaServizio', (request, response) => {
    const { id_user, descrizione_servizio, indirizzo_servizio, prezzo_servizio } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.creaServizio(id_user, descrizione_servizio, indirizzo_servizio, prezzo_servizio);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/createNewCityCard', (request, response) => {
    const { id_user } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.createNewCityCard(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})
app.post('/api/deactivateCityCards', (request, response) => {
    const { id_user } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.deactivateCityCards(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.post('/api/register', (request, response) => {
    const { username, nome, cognome, email, password, id_ruolo} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.registerNewUser(username, nome, cognome, email, password, id_ruolo);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/registerCreditCard', (request, response) => {
    console.log(JSON.stringify(request.body))
    
    const { numero, nome, cognome, mese, anno, id_user} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.registerCreditCard(numero, cognome, nome, mese, anno, id_user);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/associaEnte', (request, response) => {
    console.log(JSON.stringify(request.body))
    
    const { id_user, id_ente} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.associaEnte(id_user, id_ente);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/creazioneEventoPeriodico', (request, response) => {
    console.log(JSON.stringify(request.body))
    
    const { id_user, nomeEvento, lun,mar,mer,gio,ven,sab,dom} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.creazioneEventoPeriodico(id_user, nomeEvento, lun,mar,mer,gio,ven,sab,dom);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});
app.post('/api/creazioneEventoNonPeriodico', (request, response) => {
    console.log(JSON.stringify(request.body))
    
    const { id_user, nomeEvento, lun,mar,mer,gio,ven,sab,dom} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.creazioneEventoNonPeriodico(id_user, nomeEvento);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

// TODO : vedere se spostare in PATCH
app.post('/api/edit_user', (request, response) => {
    const { id_user, username, nome, cognome, email, password, indirizzo, telefono , cf } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.edit_user(id_user, username, nome, cognome, email, password, indirizzo, telefono , cf);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/partecipaEvento', (request, response) => {
    const { id_evento, id_user } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.partecipaEvento(id_evento, id_user);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/sottoscriviAbbonamento', (request, response) => {
    const { id_user, id_listino_abbonamento } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.sottoscriviAbbonamento(id_user, id_listino_abbonamento);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

app.post('/api/makeCheckIn', (request, response) => {
    const { id_user, codice_mezzo, stato_checkIn } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.makeCheckIn(id_user, codice_mezzo, stato_checkIn);

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

app.get('/api/getStatAdmin', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getStatAdmin();
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getStatisticheFornitore/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getStatisticheFornitore(id_user);
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getEnti', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getEnti();
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})
app.get('/api/getServizi/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getServizi(id_user);
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getAcquisti/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getAcquisti(id_user);
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getEventi', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getEventi();
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getListinoAbbonamenti', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getListinoAbbonamenti();
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
app.patch('/api/setCreditCardDefault', (request, response) => {
    const { id_user, num_carta_credito } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.setCreditCardDefault(id_user, num_carta_credito);
    
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
app.delete('/api/deleteCreditCard', (request, response) => {
    const { numero } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.deleteCreditCard(numero);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

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
        .catch(err => console.log(err));
})

app.get('/api/getCityCardUtente/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getCityCardUtente(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})
app.get('/api/getActiveCityCard/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getActiveCityCard(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})
app.get('/api/getAssociatedEnte/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getAssociatedEnte(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})


app.get('/api/getActiveSubscription/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getActiveSubscription(id_user);
    
    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/getListaCheckIn/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getListaCheckIn(id_user);
    console.log("RESULTS", JSON.stringify(result))
    result
        // .then(data => console.log("RESULTS", JSON.stringify(data)))
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})

app.get('/api/search_ente/', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.search_ente("");
    console.log("RESULTS", JSON.stringify(result))
    result
        // .then(data => console.log("RESULTS", JSON.stringify(data)))
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})
app.get('/api/search_ente/:nome_ente', (request, response) => {
    const { nome_ente } = request.params;
    console.log("SEARCH ENTE", nome_ente)
    const db = dbService.getDbServiceInstance();

    const result = db.search_ente(nome_ente);
    console.log("RESULTS", JSON.stringify(result))
    result
        // .then(data => console.log("RESULTS", JSON.stringify(data)))
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})


app.get('/api/auth/login/:username/:password', (request, response) => {
    const { username, password } = request.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.login(username, password);
    request.session.user = result;
    result
    .then(data => request.session.user = data)
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});


app.get('/api/getCarteUtente/:id_user', (request, response) => {
    const { id_user } = request.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.getCarteUtente(id_user);
    // request.session.user = result;
    result
    // .then(data => request.session.user = data)
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});


// SESSIONE

app.get("/api/user", (req, res) => {
    const sessionUser = req.session.user;
    res.send(sessionUser);
});

// Logout page 
app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send("Your are logged out ");
});

// avvio l'app alla porta indica in .env
app.listen(process.env.PORT, () => console.log('app is running'));
