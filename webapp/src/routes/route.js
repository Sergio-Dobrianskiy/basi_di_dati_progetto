const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

route.get("/", mainController.home)
route.get("/home", mainController.home)
route.get("/login", mainController.login)
route.get("/register", mainController.register)

route.get("/cliente_home", mainController.cliente_home)
route.get("/fornitore_home", mainController.fornitore_home)
route.get("/admin_home", mainController.admin_home)


// DEV
route.get("/indice_dev", mainController.indice_dev)
route.get("/test", mainController.test)


// route.all("/*", function (req, res) {
//     res.status(400).send({status: false,message: "The api you request is not available"})
// })
module.exports = route;