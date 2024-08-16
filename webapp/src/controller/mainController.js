const axios = require('axios');

const home = async function (req, res){
    res.render('home', { text: 'This is EJS'})
}
const login = async function (req, res){
    res.render('login', { text: 'This is EJS'})
}
const register = async function (req, res){
    res.render('register', { text: 'This is EJS'})
}
const test = async function (req, res){
    res.render('test', { text: 'This is EJS'})
}
const cliente_home = async function (req, res){
    res.render('cliente_home', { text: 'This is EJS'})
}
const fornitore_home = async function (req, res){
    res.render('fornitore_home', { text: 'This is EJS'})
}
const admin_home = async function (req, res){
    res.render('admin_home', { text: 'This is EJS'})
}
const indice_dev = async function (req, res){
    res.render('indice_dev', { text: 'This is EJS'})
}







module.exports = { 
    home,
    login,
    register,
    cliente_home,
    fornitore_home,
    admin_home,
    indice_dev,
    test,

}