const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host:       process.env.HOST,
    user:       process.env.USER,
    password:   process.env.PASSWORD,
    database:   process.env.DATABASE,
    port:       process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
    console.log("connect to http://localhost:5000/")
});


class DbService {
    // creo massimo un'istanza della classe
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` select id_user, nome, cognome, email, bannato, descrizione as ruolo
                                from users u
                                join ruolo r 
                                on u.id_ruolo = r.id_ruolo`;
                
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }
    async registerNewUser(username, nome, cognome, email, password, id_ruolo) {
        console.log("ARRIVATI", username, nome, cognome, email, password, id_ruolo)
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, nome, cognome, email, password, id_ruolo, data_creazione) VALUES (?,?,?,?,?,?,?);";

                connection.query(query, [username, nome, cognome, email, password, id_ruolo, dateAdded] , (err, result) => {
                    if (err) {
                        errore = err;
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }

                })
            });
            return {
                id : insertId,
                name : nome,
                id_ruolo : id_ruolo,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log("***ERRORE****", error);
            return {fail: errore}
        }
    }
    async edit_user(user_id, username, nome, cognome, email, password, indirizzo, telefono , cf) {
        console.log("ARRIVATI", user_id, username, nome, cognome, email, password, indirizzo, telefono , cf)
        user_id = parseInt(user_id, 10); 
        telefono = parseInt(telefono, 10); 
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query =  `UPDATE users 
                                SET username = ?, nome = ?, cognome = ?, email = ?, password = ?, indirizzo = ?, telefono = ?, cf = ? 
                                where id_user = ?;`;

                connection.query(query, [username, nome, cognome, email, password, indirizzo, telefono , cf, user_id] , (err, result) => {
                    if (err) {
                        errore = err;
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }

                })
            });
            return {
                id : insertId,
                name : nome,
                id_ruolo : id_ruolo,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log("***ERRORE****", error);
            return {fail: errore}
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    // query tecnicamente sbagliata ma ho voluto divertirmi ad aggirare mysql
    // https://stackoverflow.com/questions/4429319/you-cant-specify-target-table-for-update-in-from-clause
    // l'alternativa è fare due query separate ban/unban lanciate separatamente dai due bottoni 
    // oppure prima una select e poi dal risultato lanciare ban o unban
    async ban(id_user) {
        try {
            id_user = parseInt(id_user, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `
                    UPDATE users u
                    INNER JOIN users u1 
                    on u.id_user = u1.id_user
                    SET u.bannato = CASE
                        when (
                            (
                                SELECT u1.bannato
                                where u1.id_user = ?
                            ) = 1
                        ) then 0
                        else 1
                        END
                        where u.id_user = ?;
                        `;
    
                connection.query(query, [id_user,id_user] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name LIKE  ?;";

                connection.query(query, ["%" + name + "%"], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async login(username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                // const query = "SELECT bannato, id_ruolo FROM user WHERE username = ? AND password = ?;";
                const query = "SELECT * FROM users WHERE username = ? AND password = ?;";

                connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    // console.log(results)
                    resolve(results);
                })
            });
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;