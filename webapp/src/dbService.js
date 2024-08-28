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
    multipleStatements: true,
    // PersistentConnections: true,
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

    // seleziona tutti gli enti con e senza recensione 
    // coalesce restituisce 0 se non c'è media
    // i due join imitano una full join 
    async getEnti() {
        try {
            const response = await new Promise((resolve, reject) => {
                // non seleziona enti senza recensioni
                // const query = ` select e.nome as ente, e.descrizione, e.indirizzo, e.numero_telefono as contatto, u.nome, u.cognome, e.id_ente, r.media_recensioni
                //                 from enti e
                //                 join users u
                //                 on e.id_user = u.id_user
                //                 join (
                //                     SELECT s.id_ente as id_ente, AVG(votazione) as media_recensioni
                //                     FROM recensioni r
                //                     join servizi s
                //                     on s.id_servizio = r.id_servizio
                //                     GROUP BY s.id_ente
                //                 ) as r
                //                 on r.id_ente = e.id_ente`
                const query = ` 
                select e.id_ente, e.nome as nome_ente, descrizione, e.indirizzo as indirizzo_ente, numero_telefono, e.id_user, u.nome as nome_user, cognome, email, cf, telefono, id_ruolo, media_recensioni
                from enti e
                join users u
                on e.id_user = u.id_user
                left join (
                    SELECT  s.id_ente as id_ente,  avg(coalesce(votazione, 0)) as media_recensioni
                    FROM recensioni r
                    join servizi s
                    on s.id_servizio = r.id_servizio
                    GROUP BY s.id_ente
                ) as r
                on r.id_ente = e.id_ente 
                union
                select e.id_ente, e.nome as nome_ente, descrizione, e.indirizzo as indirizzo_ente, numero_telefono, e.id_user, u.nome as nome_user, cognome, email, cf, telefono, id_ruolo, media_recensioni
                from enti e
                join users u
                on e.id_user = u.id_user
                right join (
                    SELECT  s.id_ente as id_ente,  avg(coalesce(votazione, 0)) as media_recensioni
                    FROM recensioni r
                    join servizi s
                    on s.id_servizio = r.id_servizio
                    GROUP BY s.id_ente
                ) as r
                on r.id_ente = e.id_ente  `
                
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response)
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
                const query = ` select ev.*, en.nome as organizzatore, periodi.*
                                from eventi ev
                                join enti en
                                on ev.id_ente = en.id_ente
                                join periodi
                                on periodi.id_periodo = ev.id_periodo
                                where now() < ev.fine_validita;
                                `
                
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

    // ritorna eventi
    async getServizi(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {
                // const query = ` select se.*, en.nome as organizzatore
                //                 from servizi se
                //                 join enti en
                //                 on se.id_ente = en.id_ente
                //                 where now() < se.fine_validita;`
                const query = ` set @id_user = ?;     
                                set @cityCard = ( select id_city_card
                                        from city_card
                                        where id_user = @id_user and data_scadenza > now());
                                set @percentToPay = (SELECT (100 - sconti.percentuale_sconto) / 100
                                            from sconti 
                                            join listino_abbonamenti ls 
                                            on sconti.id_sconto = ls.id_sconto
                                            join sottoscrizioni_abbonamento sa
                                            on  ls.id_sconto = sa.id_listino_abbonamento
                                            where sa.id_city_card = @cityCard);
                                select se.*, en.nome as organizzatore, se.prezzo_servizio * @percentToPay as prezzo_scontato
                                        from servizi se
                                        join enti en
                                        on se.id_ente = en.id_ente
                                        where now() < se.fine_validita;`
                
                connection.query(query, [id_user] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    

    // ritorna servizi acquistati dall'utente
    async getAcquisti(id_user) {
        try {
            const response = await new Promise((resolve, reject) => {

                const query = ` SELECT sa.data_acquisto, sa.prezzo_pagato, cc.id_city_card, sa.num_carta_credito, servizi.descrizione_servizio as nome_servizio, u.id_user, sa.id_servizio
                                FROM servizi_acquistati sa
                                join city_card cc
                                on cc.id_city_card = sa.id_city_card
                                join users u
                                on u.id_user = cc.id_user
                                join servizi
                                on servizi.id_servizio = sa.id_servizio
                                where cc.data_scadenza>now() and cc.id_user = ?
                                ORDER BY sa.data_acquisto DESC;`
                
                connection.query(query, [id_user] , (err, results) => {
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
    
    
    // dato che un utente puà avere una recensione per servizio cancello la precedente
    // inserisco il voto nuovo, calcolo la media, la inserisco nel servizio
    async vota(id_user, votazione, id_servizio) {
        console.log("Arrivati ", id_user, votazione, id_servizio)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` 
                                SET @idUser = ?;
                                SET @idServizio = ?;
                                
                                DELETE 
                                FROM recensioni 
                                WHERE id_user = @idUser and id_servizio = @idServizio;
                                
                                insert into recensioni (id_user, votazione, id_servizio) VALUES(@idUser,?,@idServizio);
                                
                                SET @media = (SELECT AVG(votazione) 
                                    FROM recensioni 
                                    WHERE id_user = @idUser and id_servizio = @idServizio);
                                
                                UPDATE servizi
                                SET media_recensioni = @media
                                WHERE id_servizio = @idServizio;
                                `;

                connection.query(query, [id_user, id_servizio, votazione] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }



    // reset di tutte le recensioni riguardanti un ente
    async resetRecensioni( id_ente) {
        console.log("Arrivati ",  id_ente)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` 
                                SET @id_ente = ?;

                                DELETE recensioni 
                                FROM recensioni
                                join servizi s
                                on s.id_servizio = recensioni.id_servizio
                                WHERE s.id_ente = @id_ente;

                                UPDATE servizi s
                                SET media_recensioni = null
                                WHERE s.id_ente = @id_ente;
                                `;

                connection.query(query, [id_ente] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // crea un servizio. "limit 1" non dovrebbe servire in quanto un fornitore può essere
    // associato con solo un ente ma protegge da possibili errori come una doppia scrittura dello stesso record
    async creaServizio(id_user, descrizione_servizio, indirizzo_servizio, prezzo_servizio) {
        console.log("Arrivati ", id_user, descrizione_servizio, indirizzo_servizio, prezzo_servizio)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` INSERT INTO servizi (descrizione_servizio, indirizzo_servizio, id_ente, prezzo_servizio) 
                                VALUES (?, ?, 
                                        ( select c.id_ente
                                        from collaborazioni c
                                        where c.id_user = ? and c.fine_collaborazione is null limit 1), ?);;`;

                connection.query(query, [descrizione_servizio, indirizzo_servizio, id_user, prezzo_servizio] , (err, result) => {
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
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO partecipazioni (id_evento, id_user) VALUES (?,?);";

                connection.query(query, [id_evento, id_user] , (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }

                })
            });
            return response;
        } catch (error) {
            return {fail: error}
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

    // compra un servizio tenendo conto dello sconto concesso dalla fascia di abbonamento posseduto
    // poi aggiunge la somma pagata al saldo dell'ente che eroga il servizio 
    // la parte commentata esegue esegue l'acquisto senza l'utilizzo di variabili, ho abbandonato l'idea 
    // di aggiornare il saldo senza variabili perché incappo nello stesso problema di ban()
    async compraServizio(id_user, id_evento) {
        console.log("Arrivati ", id_user, id_evento)
        try {
            const response = await new Promise((resolve, reject) => {
                // const query = ` INSERT INTO servizi_acquistati (id_servizio, prezzo_pagato, num_carta_credito, id_city_card) 
                //                 VALUES (
                //                         ?, 
                //                         ( SELECT prezzo_servizio * 
                //                             (SELECT (100 - sconti.percentuale_sconto) / 100
                //                             from sconti 
                //                             join listino_abbonamenti ls 
                //                             on sconti.id_sconto = ls.id_sconto
                //                             join sottoscrizioni_abbonamento sa
                //                             on  ls.id_sconto = sa.id_listino_abbonamento
                //                             where sa.id_city_card = 
                //                                                     ( select id_city_card
                //                                                     from city_card
                //                                                     where id_user = ? and data_scadenza > now()) 
                //                             )
                //                         from servizi
                //                         where id_servizio = ?
                //                         ), 
                //                         ( SELECT num_carta_credito 
                //                         FROM carte_credito
                //                         where id_user = ? and predefinita = 1),
                //                         ( select id_city_card
                //                         from city_card
                //                         where id_user = ? and data_scadenza > now()) 
                //                     );`;
                const query = ` 
                                set @id_user = ?;
                                set @id_servizio = ?;
                                set @idEnte = (
                                                    SELECT enti.id_ente 
                                                    from enti
                                                    join servizi
                                                    on enti.id_ente = servizi.id_ente
                                                    where servizi.id_servizio = @id_servizio);
                                set @creditCard = ( SELECT num_carta_credito 
                                                    FROM carte_credito
                                                    where id_user = @id_user and predefinita = 1);
                                set @cityCard = (   select id_city_card
                                                    from city_card
                                                    where id_user = @id_user and data_scadenza > now());
                                set @percentToPay = (SELECT (100 - sconti.percentuale_sconto) / 100
                                                    from sconti 
                                                    join listino_abbonamenti ls 
                                                    on sconti.id_sconto = ls.id_sconto
                                                    join sottoscrizioni_abbonamento sa
                                                    on  ls.id_sconto = sa.id_listino_abbonamento
                                                    where sa.id_city_card = @cityCard);
                                set @paidPrice = (  SELECT prezzo_servizio * @percentToPay
                                                    from servizi
                                                    where id_servizio = @id_servizio);

                                INSERT INTO servizi_acquistati (id_servizio, prezzo_pagato, num_carta_credito, id_city_card) 
                                VALUES (@id_servizio, @paidPrice, @creditCard,@cityCard );
                                
                                UPDATE enti 
                                set saldo = saldo + @paidPrice
                                WHERE id_ente = @idEnte;
                                `

                // connection.query(query, [id_evento, id_user, id_evento, id_user, id_user] , (err, result) => {
                connection.query(query, [id_user, id_evento] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    // trova l'ente associato all'utente e crea un'evento
    async creazioneEvento(id_user, nomeEvento, numero_pertecipanti, lun,mar,mer,gio,ven,sab,dom) {
        console.log("Arrivati ", id_user, nomeEvento, numero_pertecipanti, lun,mar,mer,gio,ven,sab,dom)

        id_user = parseInt(id_user, 10); 
        numero_pertecipanti = parseInt(numero_pertecipanti, 10); 
        try {
            const response = await new Promise((resolve, reject) => {
                const query = ` 
                                set @idUser = ?;
                                set @idEnte = ( select c.id_ente
                                        from collaborazioni c
                                        where c.id_user = @idUser and c.fine_collaborazione is null limit 1);

                                INSERT INTO periodi (lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica) 
                                VALUES (?,?,?,?,?,?,?);
                                -- set @idPeriodo = SELECT LAST_INSERT_ID('id_periodo'); --  serve PersistentConnections
                                set @idPeriodo = (SELECT MAX(id_periodo) FROM periodi);

                                INSERT INTO eventi (id_periodo, nome_evento, num_partecipanti, id_ente) 
                                VALUES (@idPeriodo, ?,?, @idEnte);

                                `

                // connection.query(query, [id_evento, id_user, id_evento, id_user, id_user] , (err, result) => {
                connection.query(query, [id_user, lun,mar,mer,gio,ven,sab,dom, nomeEvento, numero_pertecipanti] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }









}

module.exports = DbService;