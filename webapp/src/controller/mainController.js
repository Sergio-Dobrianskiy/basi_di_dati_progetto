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
const cliente_home = async function (req, res){
    res.render('cliente/cliente_home/cliente_home', { text: 'This is EJS'})
}




const fornitore_home = async function (req, res){
    res.render('fornitore/fornitore_home/fornitore_home', { text: 'This is EJS'})
}
const admin_home = async function (req, res){
    res.render('admin/admin_home/admin_home', { text: 'This is EJS'})
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
    admin_home,


    indice_dev,
    test,


}