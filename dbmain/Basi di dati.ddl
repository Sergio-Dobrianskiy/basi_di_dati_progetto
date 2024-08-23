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

START TRANSACTION;

create database CityCardDB;
use CityCardDB;


-- Tables Section
-- _____________ 

create table CARTE_CREDITO (
	 num_carta_credito int unique not null,
     id_utente int not null,
     mese_scadenza date not null,
     anno_scadenza date not null,
     cvv int not null,
     data_registrazione_carta date not null,
     id_user int not null,
     constraint IDCartaCredito primary key (num_carta_credito));

create table CHECKS (
     id_check int unique not null auto_increment,
     orario_convalida date not null,
     id_city_card int not null,
     id_mezzo varchar(30) not null,
     id_stato int not null,
     constraint IDCHECKS primary key (id_check));

create table CITY_CARD (
     id_city_card int not null auto_increment,
     id_utente int not null,
     data_emissione date not null,
     data_scadenza date not null,
     constraint IDCITY_CARD primary key (id_city_card));

create table COLLABORAZIONI (
     id_collaborazione int not null auto_increment,
     inizio_collaborazione date not null,
     fine_collaborazione date not null,
     id_user int not null,
     id_ente int not null,
     constraint IDCOLLABORATORI primary key (id_collaborazione));

create table ENTI (
     id_ente int not null auto_increment,
     desc_ente varchar(30) not null,
     saldo int not null,
     indirizzo varchar(30) not null,
     numero_telefono varchar(30) not null,
     nome varchar(30) not null,
     id_user int not null,
     constraint IDENTI primary key (id_ente));

create table EVENTI (
     id_evento int not null auto_increment,
     id_periodo int,
     descrizione varchar(30) not null,
     num_partecipanti int not null,
     inizio_validità date not null,
     fine_validità date not null,
     id_ente int not null,
     constraint IDEVENTO primary key (id_evento),
     constraint FKR_1_ID unique (id_periodo));

create table LISTINO_ABBONAMENTI (
     id_listino_abbonamento int not null auto_increment,
     desc_abbonamento varchar(30) not null,
     prezzo_abbonamento int not null,
     durata_abbonamento date not null,
     data_disattivazione date not null,
     id_sconto int not null,
     constraint IDLISTINO_ABBONAMENTI primary key (id_listino_abbonamento));

create table MEZZI (
     id_mezzo varchar(30) unique not null,
     desc_mezzo varchar(30) not null,
     constraint IDMEZZI primary key (id_mezzo));

create table PARTECIPAZIONI (
     id_partecipazione int not null auto_increment,
     data_registrazione date not null,
     id_evento int not null,
     id_city_card int not null,
     constraint IDPARTECIPAZIONI primary key (id_partecipazione));

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

create table RECENSIONI (
     id_recensione int not null auto_increment,
     data_inserimento date not null,
     votazione int not null,
     id_servizio int not null,
     id_user int not null,
     constraint IDRECENSIONI primary key (id_recensione),
     constraint IDRECENSIONI_1 unique (id_servizio, id_user));

create table RUOLI (
     id_ruolo int unique not null,
     desc_ruolo varchar(30) not null,
     constraint IDRUOLI primary key (id_ruolo));

INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `desc_ruolo`) VALUES ('1', 'admin');
INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `desc_ruolo`) VALUES ('2', 'fornitore');
INSERT INTO `citycarddb`.`ruoli` (`id_ruolo`, `desc_ruolo`) VALUES ('3', 'cliente');


create table SCONTI (
     id_sconto int not null,
     percentuale_sconto int not null,
     constraint IDSCONTO primary key (id_sconto));

create table SERVIZI (
     id_servizio int not null auto_increment,
     prezzo int not null,
     data_inserimento date not null,
     data_disattivamento date not null,
     desc_servizio varchar(30) not null,
     indirizzo_servizio varchar(30) not null,
     media_recensioni int not null,
     id_ente int not null,
     num_carta_credito int not null,
     id_city_card int not null,
     constraint IDSERVIZI primary key (id_servizio));

create table SOTTOSCRIZIONI_ABBONAMENTO (
     id_sottoscrizione_abbonamento int not null auto_increment,
     prezzo_pagato int not null,
     scadenza_sottoscrizione date not null,
     data_sottoscrizione date not null,
     id_listino_abbonamento int not null,
     id_city_card int not null,
     num_carta_credito int not null,
     constraint IDSOTTOSCRIZIONI_ABBONAMENTO primary key (id_sottoscrizione_abbonamento));

create table STATI_CHECK (
     id_stato int unique not null,
     desc_stato varchar(30) not null,
     constraint IDSTATI_CHECK primary key (id_stato));

create table USERS (
     id_user int not null auto_increment,
     username varchar(30) unique not null,
     password varchar(30)  not null,
	 nome varchar(30) not null,
     cognome varchar(30) not null,
     email varchar(30) not null,
     CF varchar(16),
     telefono varchar(30),
     indirizzo char(30),
     bannato tinyint not null default 0,
     citta varchar(30),
     CAP int,
     nazione varchar(30),
     data_creazione datetime not null default now(),
     id_ruolo int not null,
     constraint IDUSERS primary key (id_user));


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

-- Not implemented
-- alter table PERIODI add constraint IDPERIODI_CHK
--     check(exists(select * from EVENTI
--                  where EVENTI.id_periodo = id_periodo)); 

alter table RECENSIONI add constraint FKR_13
     foreign key (id_servizio)
     references SERVIZI (id_servizio);

alter table RECENSIONI add constraint FKR_14
     foreign key (id_user)
     references USERS (id_user);

alter table SERVIZI add constraint FKvendita
     foreign key (id_ente)
     references ENTI (id_ente);

alter table SERVIZI add constraint FKR_15
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_16
     foreign key (id_listino_abbonamento)
     references LISTINO_ABBONAMENTI (id_listino_abbonamento);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_17
     foreign key (id_city_card)
     references CITY_CARD (id_city_card);

alter table SOTTOSCRIZIONI_ABBONAMENTO add constraint FKR_18
     foreign key (num_carta_credito)
     references CARTE_CREDITO (num_carta_credito);

alter table USERS add constraint FKR_19
     foreign key (id_ruolo)
     references RUOLI (id_ruolo);


-- Index Section
-- _____________ 
COMMIT;
