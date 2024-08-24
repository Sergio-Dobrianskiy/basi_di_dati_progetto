-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Fri Aug 23 08:00:49 2024 
-- * LUN file: D:\uni\basi_di_dati_progetto\dbmain\Basi di dati2.lun 
-- * Schema: ProgettoLogico/1 
-- ********************************************* 


-- Database Section
-- ________________ 
drop schema if exists CityCardDB;
create database CityCardDB;
use CityCardDB;


-- Tables Section
-- _____________ 





create table STATI_CHECK (
     id_stato int unique not null,
     descrizione_stato varchar(30) not null,
     constraint IDSTATI_CHECK primary key (id_stato));
     
INSERT INTO `citycarddb`.`stati_check` (`id_stato`, `descrizione_stato`) VALUES ('1', 'OK');
INSERT INTO `citycarddb`.`stati_check` (`id_stato`, `descrizione_stato`) VALUES ('2', 'ERRORE');


create table RUOLI (
     id_ruolo int unique not null,
     descrizione_ruolo varchar(30) not null,
     constraint IDRUOLI primary key (id_ruolo));

INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `descrizione_ruolo`) VALUES ('1', 'admin');
INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `descrizione_ruolo`) VALUES ('2', 'fornitore');
INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `descrizione_ruolo`) VALUES ('3', 'cliente');
-- INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `descrizione_ruolo`) VALUES ('1', 'admin'), ('2', 'fornitore'), ('3', 'cliente');


create table USERS (
     id_user int not null auto_increment,
     username varchar(30) unique not null,
     password varchar(30)  not null,
	 nome varchar(30) not null,
     cognome varchar(30) not null,
     email varchar(30) not null,
     cf varchar(16),
     telefono varchar(30),
     indirizzo char(30),
     bannato tinyint not null default 0,
     citta varchar(30),
     CAP int,
     nazione varchar(30),
     data_creazione datetime not null default now(),
     id_ruolo int not null,
     constraint IDUSERS primary key (id_user));

INSERT INTO `citycarddb`.`users` (`username`, `password`, `email`, `nome`, `cognome`, `id_ruolo`) 
VALUES 
('admin', 'admin', 'admin@gmail.com', 'giacomo', 'zanguio', 1), 
('fornitore', 'fornitore', 'fornitore@gmail.com', 'davide', 'bertizzolo', 2), 
('cliente', 'cliente', 'cliente@gmail.com', 'alessandro', 'cuneo', 3);

create table LISTINO_ABBONAMENTI (
     id_listino_abbonamento int not null auto_increment,
     descrizione_abbonamento varchar(30) not null,
     prezzo_abbonamento int not null,
     durata_abbonamento int not null,
     data_disattivazione date,
     id_sconto int not null,
     constraint IDLISTINO_ABBONAMENTI primary key (id_listino_abbonamento));
     
INSERT INTO `citycarddb`.`listino_abbonamenti` (`descrizione_abbonamento`, `prezzo_abbonamento`, `durata_abbonamento`, `id_sconto`) VALUES ('Abbonamento Bronzo', '50', '3', '1');
INSERT INTO `citycarddb`.`listino_abbonamenti` (`descrizione_abbonamento`, `prezzo_abbonamento`, `durata_abbonamento`, `id_sconto`) VALUES ('Abbonamento Argento', '100', '7', '2');
INSERT INTO `citycarddb`.`listino_abbonamenti` (`descrizione_abbonamento`, `prezzo_abbonamento`, `durata_abbonamento`, `id_sconto`) VALUES ('Abbonamento ORO', '200', '15', '3');



create table MEZZI (
     id_mezzo varchar(30) unique not null,
     descrizione_mezzo varchar(30) not null,
     partenza varchar(30),
     destinazione varchar(30),
     constraint IDMEZZI primary key (id_mezzo));
INSERT INTO `citycarddb`.`mezzi` (`id_mezzo`, `descrizione_mezzo`, `partenza`, `destinazione`) VALUES ('TR001', 'Treno n.001', 'Cesena', 'Cesenatico');
INSERT INTO `citycarddb`.`mezzi` (`id_mezzo`, `descrizione_mezzo`, `partenza`, `destinazione`) VALUES ('BUS001', 'Bus n.001', 'Cesena', 'Forlì');


create table SCONTI (
     id_sconto int not null,
     percentuale_sconto int not null,
     constraint IDSCONTO primary key (id_sconto));
     
INSERT INTO `citycarddb`.`sconti` (`id_sconto`, `percentuale_sconto`) VALUES ('1', '10');
INSERT INTO `citycarddb`.`sconti` (`id_sconto`, `percentuale_sconto`) VALUES ('2', '30');
INSERT INTO `citycarddb`.`sconti` (`id_sconto`, `percentuale_sconto`) VALUES ('3', '50');
-- INSERT INTO `citycarddb`.`sconti` (`id_sconto`, `percentuale_sconto`) VALUES ('1', '10'), ('2', '30'), ('3', '50');



create table CARTE_CREDITO (
	 num_carta_credito varchar(16) unique not null,
     cognome_associato varchar(30) not null,
     nome_associato varchar(30) not null,
     mese_scadenza int not null,
     anno_scadenza int not null,
     data_registrazione_carta datetime not null default now(),
     id_user int not null,
     constraint IDCartaCredito primary key (num_carta_credito));
INSERT INTO `citycarddb`.`carte_credito` (`num_carta_credito`, `cognome_associato`, `nome_associato`, `mese_scadenza`, `anno_scadenza`, `id_user`) 
VALUES ('1234567890123456', 'giacomo', 'zanguio', '05', '29', '1');

create table CHECKS (
     id_check int unique not null auto_increment,
     orario_convalida datetime not null default now(),
     id_city_card int not null,
     id_mezzo varchar(30) not null,
     id_stato int not null,
     constraint IDCHECKS primary key (id_check));

create table CITY_CARD (
     id_city_card int not null unique auto_increment,
     id_user int not null,
     data_emissione datetime not null default now(),
     data_scadenza datetime not null default (DATE_ADD(NEW.data_emissione, INTERVAL 5 YEAR)),
     constraint IDCITY_CARD primary key (id_city_card));
     
-- inizializzo l'indice a 100001 per rendere più estetico il numero della card
ALTER TABLE city_card AUTO_INCREMENT = 1000001;

INSERT INTO `citycarddb`.`city_card` (`id_user`) 
VALUES ('1'), ('2'), ('3');
-- DELIMITER ;;

-- CREATE TRIGGER set_data_scadenza_before_insert
-- BEFORE INSERT ON CITY_CARD
-- FOR EACH ROW
-- BEGIN
--     IF NEW.data_scadenza IS NULL THEN
--         SET NEW.data_scadenza = DATE_ADD(NEW.data_emissione, INTERVAL 5 YEAR);
--     END IF;
-- END;;
-- DELIMITER ;
-- INSERT INTO `citycarddb`.`city_card` (`id_utente`) 
-- VALUES ('1'), ('2'), ('3');


create table COLLABORAZIONI (
     id_collaborazione int not null auto_increment,
     inizio_collaborazione date not null,
     fine_collaborazione date,
     id_user int not null,
     id_ente int not null,
     constraint IDCOLLABORATORI primary key (id_collaborazione));
INSERT INTO `citycarddb`.`collaborazioni` (`id_collaborazione`, `inizio_collaborazione`, `id_user`, `id_ente`) VALUES ('1', '2024-08-23', '2', '1');

create table ENTI (
     id_ente int not null auto_increment,
     descrizione_ente varchar(30) not null,
     saldo int not null,
     indirizzo varchar(30) not null,
     numero_telefono varchar(30) not null,
     nome varchar(30) not null,
     id_user int not null,
     constraint IDENTI primary key (id_ente));
INSERT INTO `citycarddb`.`enti` (`id_ente`, `descrizione_ente`, `saldo`, `indirizzo`, `numero_telefono`, `nome`, `id_user`) VALUES ('1', 'alma mater', '50', 'via Cesena', '3494773321', 'Alma Mater', '2');

create table EVENTI (
	id_evento int not null auto_increment,
	nome_evento varchar(30) not null,
	id_periodo int default 0,
	num_partecipanti int not null,
	inizio_validità datetime not null default now(),
	fine_validità date not null,
	id_ente int not null,
	constraint IDEVENTO primary key (id_evento),
	constraint FKR_1_ID unique (id_periodo));
INSERT INTO `citycarddb`.`eventi` (`id_periodo`, `nome_evento`, `num_partecipanti`, `inizio_validità`, `fine_validità`, `id_ente`) 
VALUES ('1', 'evento natale', '5', '2024-08-22', '2024-09-30', '1');




create table PARTECIPAZIONI (
     id_partecipazione int not null auto_increment,
     data_registrazione datetime not null default now(),
     id_evento int not null,
     id_city_card int not null,
     constraint IDPARTECIPAZIONI primary key (id_partecipazione));
INSERT INTO `citycarddb`.`partecipazioni` (`id_partecipazione`, `data_registrazione`, `id_evento`, `id_city_card`) VALUES ('1', '2024-08-23', '1', '1000001');




create table PERIODI (
     id_periodo int not null auto_increment,
     ripeti_ogni int not null,
     periodo varchar(30) not null,
     lunedi tinyint not null default 0,
     martedi tinyint not null default 0,
     mercoledi tinyint not null default 0,
     giovedi tinyint not null default 0,
     venerdi tinyint not null default 0,
     sabato tinyint not null default 0,
     domenica tinyint not null default 0,
     constraint IDPERIODI_ID primary key (id_periodo));
INSERT INTO `citycarddb`.`periodi` (`id_periodo`, `ripeti_ogni`, `periodo`, `lunedi`) VALUES ('1', '1', '1', '1');



create table RECENSIONI (
     id_recensione int not null auto_increment,
     data_inserimento datetime not null default now(),
     votazione int not null,
     id_servizio int not null,
     id_user int not null,
     constraint IDRECENSIONI primary key (id_recensione),
     constraint IDRECENSIONI_1 unique (id_servizio, id_user));




create table SERVIZI (
     id_servizio int not null auto_increment,
     prezzo_servizio float not null,
     data_inserimento datetime not null default now(),
     data_termine datetime not null default (DATE_ADD(NEW.data_inserimento, INTERVAL 1 YEAR)),
     descrizione_servizio varchar(255) not null,
     indirizzo_servizio varchar(100) not null,
     media_recensioni int,
     id_ente int not null,
     constraint IDSERVIZI primary key (id_servizio));
     
INSERT INTO `citycarddb`.`servizi` (`prezzo_servizio`, `descrizione_servizio`, `indirizzo_servizio`, `id_ente`) 
VALUES ('10', 'Visita guidata al museo comunale', 'Via Museo Comunale', '1');

     
create table SERVIZI_ACQUISTATI (
     id_acquisto int not null auto_increment,
     data_acquisto datetime not null default now(),
     prezzo_pagato float not null,
     media_recensioni float,
     id_servizio int not null,
     num_carta_credito varchar(16) not null,
     id_city_card int not null,
     constraint IDCQUISTO primary key (id_acquisto));

create table SOTTOSCRIZIONI_ABBONAMENTO (
     id_sottoscrizione_abbonamento int not null auto_increment,
     prezzo_pagato float not null,
     scadenza_sottoscrizione date not null,
     data_sottoscrizione datetime not null default now(),
     id_listino_abbonamento int not null,
     id_city_card int not null,
     num_carta_credito varchar(16) not null,
     constraint IDSOTTOSCRIZIONI_ABBONAMENTO primary key (id_sottoscrizione_abbonamento));

DELIMITER ;;
CREATE TRIGGER set_scadenza_sottoscrizione_before_insert
BEFORE INSERT ON SOTTOSCRIZIONI_ABBONAMENTO
FOR EACH ROW
BEGIN
    IF NEW.scadenza_sottoscrizione IS NULL THEN
        SET NEW.scadenza_sottoscrizione = DATE_ADD(NEW.data_sottoscrizione, INTERVAL 5 YEAR);
    END IF;
END;;
DELIMITER ;
INSERT INTO `citycarddb`.`sottoscrizioni_abbonamento` (`id_sottoscrizione_abbonamento`, `prezzo_pagato`, `id_listino_abbonamento`, `id_city_card`, `num_carta_credito`) VALUES ('1', '35', '1', '1000001', '1234567890123456');




-- Constraints Section
-- ___________________ 

alter table CARTE_CREDITO add constraint FKR_1
     foreign key (id_user)
     references USERS (id_user);

alter table CHECKS add constraint FKR_2
     foreign key (id_mezzo)
     references MEZZI (id_mezzo);

alter table CHECKS add constraint FKR_3
     foreign key (id_stato)
     references STATI_CHECK (id_stato);

alter table CHECKS add constraint FKR_4
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table COLLABORAZIONI add constraint FKR_5
     foreign key (id_user)
     references USERS (id_user);

alter table COLLABORAZIONI add constraint FKR_6
     foreign key (id_ente)
     references ENTI (id_ente);

alter table ENTI add constraint FKR_7
     foreign key (id_user)
     references USERS (id_user);

alter table EVENTI add constraint FKR_8
     foreign key (id_ente)
     references ENTI (id_ente);

alter table EVENTI add constraint FKR_9
     foreign key (id_periodo)
     references PERIODI (id_periodo);

alter table LISTINO_ABBONAMENTI add constraint FKR_10
     foreign key (id_sconto)
     references SCONTI (id_sconto);

alter table PARTECIPAZIONI add constraint FKR_11
     foreign key (id_evento)
     references EVENTI (id_evento);

alter table PARTECIPAZIONI add constraint FKR_12
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table RECENSIONI add constraint FKR_13
     foreign key (id_servizio)
     references SERVIZI (id_servizio);

alter table RECENSIONI add constraint FKR_14
     foreign key (id_user)
     references USERS (id_user);

alter table SERVIZI add constraint FKvendita
     foreign key (id_ente)
     references ENTI (id_ente);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_15
     foreign key (id_listino_abbonamento)
     references LISTINO_ABBONAMENTI (id_listino_abbonamento);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_16
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_17
     foreign key (num_carta_credito)
     references CARTE_CREDITO (num_carta_credito);

alter table USERS add constraint FKR_18
     foreign key (id_ruolo)
     references RUOLI (id_ruolo);
     
alter table SERVIZI_ACQUISTATI add constraint FKR_19
     foreign key (num_carta_credito)
     references CARTE_CREDITO (num_carta_credito);

alter table SERVIZI_ACQUISTATI add constraint FKR_20
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table SERVIZI_ACQUISTATI add constraint FKR_21
     foreign key (id_servizio)
     references SERVIZI (id_servizio);


-- Index Section
-- _____________ 
