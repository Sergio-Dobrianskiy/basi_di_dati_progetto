const axios = require('axios');

const index = async function (req, res){
    res.render('index', { text: 'This is EJS'})
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

module.exports = { index,
    login,
    register,
    test,
}