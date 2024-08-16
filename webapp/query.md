# INSERT INTO USER
insert into user (username, password, nome, cognome,  email, ruolo)
values('admin2','admin2', 'nome','cognome','admin2@gmail.com',1);

# RESET AUTO_INCREMENT
ALTER TABLE user AUTO_INCREMENT = 1