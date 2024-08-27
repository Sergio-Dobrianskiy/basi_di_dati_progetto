const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();
// di default mysql non accetta query multiple in una singola query
const connection = mysql.createConnection({
    host:       process.env.HOST,
    user:       process.env.USER,
    password:   process.env.PASSWORD,
    database:   process.env.DATABASE,
    port:       process.env.DB_PORT,
    multipleStatements: true
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
                const query = ` select id_user, nome, cognome, email, bannato, descrizione_ruolo as ruolo
                                from users u
                                join ruoli r 
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

    async getEnti() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` select e.nome as ente, e.descrizione, e.indirizzo, e.numero_telefono as contatto, u.nome, u.cognome
                                from enti e
                                join users u
                                on e.id_user = u.id_user;`
                
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
    async getEventi() {
        try {
            const response = await new Promise((resolve, reject) => {
                // Alternativa con count distinct 
                // const query = ` select ev.*, en.nome as organizzatore, c.*
                //                 from eventi ev
                //                 join enti en
                //                 on ev.id_ente = en.id_ente
                //                 join (SELECT id_evento, count(distinct id_city_card) as partecipanti
                //                         FROM partecipazioni
                //                         group by id_evento) as c
                //                 on ev.id_evento = c.id_evento;`
                const query = ` select ev.*, en.nome as organizzatore
                                from eventi ev
                                join enti en
                                on ev.id_ente = en.id_ente
                                where now() < ev.fine_validita;`
                
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

    async getListinoAbbonamenti() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` select l.*, s.percentuale_sconto
                                from listino_abbonamenti l
                                join sconti s
                                on l.id_sconto = s.id_sconto
                                where l.data_disattivazione is null or l.data_disattivazione < now();`
                
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

    async crea_ente(id_user, nome_ente, descrizione, indirizzo_ente, telefono_ente) {
        console.log("Arrivati ", id_user, nome_ente, descrizione, indirizzo_ente, telefono_ente)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` INSERT INTO enti (nome, descrizione, indirizzo, numero_telefono, id_user) 
                                VALUES (?, ?, ?, ?,  ?);`;

                connection.query(query, [nome_ente, descrizione, indirizzo_ente, telefono_ente, id_user] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
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

    async registerCreditCard(num_carta_credito, cognome, nome, mese_scadenza, anno_scadenza, id_user) {
        console.log("ARRIVATI", num_carta_credito, cognome, nome, mese_scadenza, anno_scadenza, id_user)
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO carte_credito (num_carta_credito, cognome_associato, nome_associato, mese_scadenza, anno_scadenza, id_user) VALUES (?,?,?,?,?,?);";

                connection.query(query, [num_carta_credito, cognome, nome, mese_scadenza, anno_scadenza, id_user] , (err, result) => {
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
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log("***ERRORE****", error);
            return {fail: errore}
        }
    }
    async createNewCityCard(id_user) {
        console.log("ARRIVATI", id_user)
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = ` INSERT INTO city_card (id_user) 
                                VALUES('?');`;
                connection.query(query, [id_user] , (err, result) => {
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
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log("***ERRORE****", error);
            return {fail: errore}
        }
    }
    

    // Per disattivare una card pongo la data di scadenza a now()
    // Per controllare se la card è attiva controllo se il momento di disattivazione è già passato
    // In ogni momento un utente può avere al massimo una citycard attiva,
    // quindi per default disattivo tutte quelle attive
    async deactivateCityCards(id_user) {
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = ` update city_card
                                set data_scadenza = now()
                                where id_user = ? and data_scadenza > now();`;
                connection.query(query, [id_user] , (err, result) => {
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
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log("***ERRORE****", error);
            return {fail: errore}
        }
    }

    // rendo predefinita una carta di credito di un utente
    // rendo non predefinite tutte le altre
    // query doppia, una delle alternative a quello fatto in ban
    async setCreditCardDefault(id_user, num_carta_credito) {
        console.log("arrivati", id_user, num_carta_credito)
        try {
            id_user = parseInt(id_user, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `
                                update carte_credito
                                set predefinita = 0
                                where id_user = ?;

                                update carte_credito
                                set predefinita = 1
                                where num_carta_credito = ?;`;
    
                connection.query(query, [id_user, num_carta_credito] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // sottoscrivi abbonamento con la carta di credito predefinita
    async sottoscriviAbbonamento(id_user, id_listino_abbonamento) {
        console.log("arrivati", id_user, id_listino_abbonamento)
        try {
            id_user = parseInt(id_user, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `
                                INSERT INTO sottoscrizioni_abbonamento (id_listino_abbonamento, id_city_card, num_carta_credito) 
                                VALUES (?, 
                                        ( select id_city_card
                                                    from city_card
                                                    where id_user = ? and data_scadenza > now()), 
                                        ( SELECT num_carta_credito 
                                                    FROM carte_credito
                                                    where id_user = ? and predefinita = 1));`;
                connection.query(query, [id_listino_abbonamento, id_user, id_user] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // associa utente a ente
    async associaEnte(id_user, id_ente) {
        console.log("arrivati", id_user, id_ente)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                                INSERT INTO collaborazioni 
                                (id_user, id_ente) 
                                VALUES (?, ?);`;
                connection.query(query, [id_user, id_ente] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // effettua tentativo di check-in
    async makeCheckIn(id_user, codice_mezzo, stato_checkIn) {
        console.log("arrivati", id_user, codice_mezzo, stato_checkIn)
        try {
            id_user = parseInt(id_user, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `
                                INSERT INTO checks (id_city_card, id_mezzo, id_stato) 
                                VALUES ((( select id_city_card
                                            from city_card
                                            where id_user = ? and data_scadenza > now())), 
                                            ?, ?);`;
                connection.query(query, [id_user, codice_mezzo, stato_checkIn] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getCityCardUtente(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` SELECT *, (if (data_scadenza > now(), "attiva", "non attiva")) as stato
                                FROM city_card 
                                where id_user = ?
                                ORDER BY id_city_card DESC`;

                connection.query(query, [id_user] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }


    // Placeholder
    async partecipaEvento(id_evento, id_user) {
        console.log("ARRIVATI", id_evento, id_user)
        var errore;
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO partecipazioni (id_evento, id_user) VALUES (?,?);";

                connection.query(query, [id_evento, id_user] , (err, result) => {
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
        // telefono = parseInt(telefono, 10); 
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

    async deleteCreditCard(numero) {
        try {
            // id_user = parseInt(id_user, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `
                        DELETE FROM carte_credito
                        where num_carta_credito = ?;`;
    
                connection.query(query, [numero] , (err, result) => {
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
                const query = `SELECT u.*, r.descrizione_ruolo as ruolo
                                from users u
                                join ruoli r 
                                on u.id_ruolo = r.id_ruolo
                                WHERE username = ? AND password = ?;`;
                connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // ritorna, se presente, la citycard attiva dell'utente
    async getActiveCityCard(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                // const query = "SELECT bannato, id_ruolo FROM user WHERE username = ? AND password = ?;";
                const query = ` select *
                                from city_card
                                where id_user = ? and data_scadenza > now();`;
                connection.query(query, [id_user], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // ritorna, se presente, la l'ente associato all'utente
    async getAssociatedEnte(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` select *
                                from collaborazioni
                                where id_user = ? and fine_collaborazione is null;`;
                connection.query(query, [id_user], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // ritorna, se presente, la citycard attiva dell'utente
    // TODO raffinare il select *
    async getActiveSubscription(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` SELECT sa.* 
                                    FROM sottoscrizioni_abbonamento sa
                                    join city_card cc
                                    on sa.id_city_card = cc.id_city_card
                                    join users u
                                    on cc.id_user = u.id_user
                                    where u.id_user = ?;`;
                connection.query(query, [id_user], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // ritorna i check-in fatti dall'utente
    async getListaCheckIn(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` SELECT ch.*, sc.descrizione_stato, m.*
                                FROM checks ch
                                join city_card cc
                                on ch.id_city_card = cc.id_city_card
                                join users u
                                on cc.id_user = u.id_user
                                join stati_check sc
                                on ch.id_stato = sc.id_stato
                                join mezzi m
                                on ch.id_mezzo = m.id_mezzo
                                where u.id_user = ?;`;
                connection.query(query, [id_user], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // ritorna gli enti disponibili, eventualmente filtrati per nome
    async search_ente(nome_ente) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` SELECT * FROM enti
                                where nome like ?;`;
                console.log(query)
                connection.query(query, ["%" + nome_ente + "%"], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getCarteUtente(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT c.*, u.nome, u.cognome
                                from carte_credito c
                                join users u
                                on c.id_user = u.id_user
                                WHERE c.id_user = ?;`;
                connection.query(query, [id_user], (err, results) => {
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