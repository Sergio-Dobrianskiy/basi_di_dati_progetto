const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

// HOME
route.get("/", mainController.home)
route.get("/home", mainController.home)
route.get("/login", mainController.login)
route.get("/register", mainController.register)

// CLIENTE
route.get("/cliente_home", mainController.cliente_home)
route.get("/abbonamento", mainController.abbonamento)
route.get("/acquisti", mainController.acquisti)
route.get("/carta_di_credito", mainController.carta_di_credito)
route.get("/check_in", mainController.check_in)
route.get("/citycard", mainController.citycard)
route.get("/eventi", mainController.eventi)
route.get("/servizi", mainController.servizi)


// FORNITORE
route.get("/fornitore_home", mainController.fornitore_home)
route.get("/associa_ente", mainController.associa_ente)
route.get("/crea_ente", mainController.crea_ente)
route.get("/crea_servizio", mainController.crea_servizio)
route.get("/statistiche_eventi", mainController.statistiche_eventi)
route.get("/statistiche_saldo", mainController.statistiche_saldo)
route.get("/statistiche_servizi", mainController.statistiche_servizi)


// ADMIN
route.get("/admin_home", mainController.admin_home)
route.get("/lista_enti", mainController.lista_enti)
route.get("/lista_user", mainController.lista_user)
route.get("/statistiche_admin", mainController.statistiche_admin)


// DEV
route.get("/dev_indice", mainController.indice_dev)
route.get("/dev_test", mainController.test)


// route.all("/*", function (req, res) {
//     res.status(400).send({status: false,message: "The api you request is not available"})
// })
module.exports = route;