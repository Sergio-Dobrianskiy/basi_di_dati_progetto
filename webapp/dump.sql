-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: web_app
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_added` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `names`
--

LOCK TABLES `names` WRITE;
/*!40000 ALTER TABLE `names` DISABLE KEYS */;
INSERT INTO `names` VALUES (1,'123','2024-08-14 23:00:17.423'),(2,'ciao2','2024-08-14 23:00:51.520'),(3,'ciao bello','2024-08-14 23:01:37.826'),(6,'test2','2024-08-16 00:21:32.099'),(7,'zxc','2024-08-16 00:21:54.134'),(8,'aggiunta','2024-08-20 21:43:00.436');
/*!40000 ALTER TABLE `names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruolo`
--

DROP TABLE IF EXISTS `ruolo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruolo` (
  `id_ruolo` int NOT NULL,
  `descrizione` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_ruolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruolo`
--

LOCK TABLES `ruolo` WRITE;
/*!40000 ALTER TABLE `ruolo` DISABLE KEYS */;
INSERT INTO `ruolo` VALUES (1,'admin'),(2,'fornitore'),(3,'cliente');
/*!40000 ALTER TABLE `ruolo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cognome` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cf` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cellulare` int DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `via` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `citta` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cap` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nazione` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_creazione` datetime DEFAULT NULL,
  `ultimo_accesso` datetime DEFAULT NULL,
  `bannato` tinyint NOT NULL DEFAULT '0' COMMENT 'boolean non esiste in mysql, vedere se è possibile cambiare dopo\\nTo Create a Boolean Column in Table with default false:\\nALTER TABLE table_name ADD field_name tinyint(1);\\',
  `commento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_ruolo` int NOT NULL COMMENT '0: admin\\\\n1: fornitore\\\\n2: cliente',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `cf_UNIQUE` (`cf`),
  KEY `id_ruolo` (`id_ruolo`),
  CONSTRAINT `id_ruolo` FOREIGN KEY (`id_ruolo`) REFERENCES `ruolo` (`id_ruolo`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','mario','rossi',NULL,NULL,'admin1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1),(2,'admin2','admin2','joe','rogan',NULL,NULL,'admin2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1),(3,'fornitore','fornitore','mario','rossi',NULL,NULL,'fornitore1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,2),(4,'fornitore2','fornitore2','fabio','verdi',NULL,NULL,'fornitore2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,2),(5,'cliente','cliente','giacomo','zanguio',NULL,NULL,'cliente1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,3),(6,'cliente2','cliente2','alessandro','cuneo',NULL,NULL,'cliente2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-21 20:48:47
