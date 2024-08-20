const axios = require('axios');

const home = async function (req, res){
    res.render('home/home/home', { text: 'This is EJS'})
}
const login = async function (req, res){
    res.render('home/login/login', { text: 'This is EJS'})
}
const register = async function (req, res){
    res.render('home/register/register', { text: 'This is EJS'})
}
const test = async function (req, res){
    res.render('dev/dev_test/dev_test', { text: 'This is EJS'})
}
const abbonamento = async function (req, res){
    res.render('cliente/abbonamento/abbonamento', { text: 'This is EJS'})
}

// CLIENTE
const cliente_home = async function (req, res){
    res.render('cliente/cliente_home/cliente_home', { text: 'This is EJS'})
}
const acquisti = async function (req, res){
    res.render('cliente/acquisti/acquisti', { text: 'This is EJS'})
}
const carta_di_credito = async function (req, res){
    res.render('cliente/carta_di_credito/carta_di_credito', { text: 'This is EJS'})
}
const check_in = async function (req, res){
    res.render('cliente/check_in/check_in', { text: 'This is EJS'})
}
const citycard = async function (req, res){
    res.render('cliente/citycard/citycard', { text: 'This is EJS'})
}
const eventi = async function (req, res){
    res.render('cliente/eventi/eventi', { text: 'This is EJS'})
}
const servizi = async function (req, res){
    res.render('cliente/servizi/servizi', { text: 'This is EJS'})
}

// FORNITORE
const fornitore_home = async function (req, res){
    res.render('fornitore/fornitore_home/fornitore_home', { text: 'This is EJS'})
}
const associa_ente = async function (req, res){
    res.render('fornitore/associa_ente/associa_ente', { text: 'This is EJS'})
}
const crea_ente = async function (req, res){
    res.render('fornitore/crea_ente/crea_ente', { text: 'This is EJS'})
}
const crea_evento = async function (req, res){
    res.render('fornitore/crea_evento/crea_evento', { text: 'This is EJS'})
}
const crea_servizio = async function (req, res){
    res.render('fornitore/crea_servizio/crea_servizio', { text: 'This is EJS'})
}
const statistiche_eventi = async function (req, res){
    res.render('fornitore/statistiche_eventi/statistiche_eventi', { text: 'This is EJS'})
}
const statistiche_saldo = async function (req, res){
    res.render('fornitore/statistiche_saldo/statistiche_saldo', { text: 'This is EJS'})
}
const statistiche_servizi = async function (req, res){
    res.render('fornitore/statistiche_servizi/statistiche_servizi', { text: 'This is EJS'})
}


// ADMIN
const admin_home = async function (req, res){
    res.render('admin/admin_home/admin_home', { text: 'This is EJS'})
}
const lista_enti = async function (req, res){
    res.render('admin/lista_enti/lista_enti', { text: 'This is EJS'})
}
const lista_user = async function (req, res){
    res.render('admin/lista_user/lista_user', { text: 'This is EJS'})
}
const statistiche_admin = async function (req, res){
    res.render('admin/statistiche_admin/statistiche_admin', { text: 'This is EJS'})
}



const indice_dev = async function (req, res){
    res.render('dev/dev_indice/dev_indice', { text: 'This is EJS'})
}


module.exports = { 
    home,
    login,
    register,

    cliente_home,
    abbonamento,
    acquisti,
    carta_di_credito,
    check_in,
    citycard,
    eventi,
    servizi,

    fornitore_home,
    associa_ente,
    crea_ente,
    crea_evento,
    crea_servizio,
    statistiche_eventi,
    statistiche_saldo,
    statistiche_servizi,

    
    admin_home,
    lista_enti,
    lista_user,
    statistiche_admin,

    indice_dev,
    test,


}