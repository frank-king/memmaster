-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: dictionary
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analogys`
--

DROP TABLE IF EXISTS `analogys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `analogys` (
  `word_id` int(11) NOT NULL,
  `analogy_id` int(11) NOT NULL,
  `words` text,
  `explanations` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analogys`
--

LOCK TABLES `analogys` WRITE;
/*!40000 ALTER TABLE `analogys` DISABLE KEYS */;
/*!40000 ALTER TABLE `analogys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etymologys`
--

DROP TABLE IF EXISTS `etymologys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etymologys` (
  `word_id` int(11) NOT NULL,
  `etymology` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etymologys`
--

LOCK TABLES `etymologys` WRITE;
/*!40000 ALTER TABLE `etymologys` DISABLE KEYS */;
/*!40000 ALTER TABLE `etymologys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examples`
--

DROP TABLE IF EXISTS `examples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examples` (
  `word_id` int(11) NOT NULL,
  `expression` text,
  `translation` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examples`
--

LOCK TABLES `examples` WRITE;
/*!40000 ALTER TABLE `examples` DISABLE KEYS */;
/*!40000 ALTER TABLE `examples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `explanations`
--

DROP TABLE IF EXISTS `explanations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `explanations` (
  `word_id` int(11) NOT NULL,
  `exp_id` int(11) NOT NULL,
  `form` tinytext,
  `explanation` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `explanations`
--

LOCK TABLES `explanations` WRITE;
/*!40000 ALTER TABLE `explanations` DISABLE KEYS */;
/*!40000 ALTER TABLE `explanations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mnemonics`
--

DROP TABLE IF EXISTS `mnemonics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mnemonics` (
  `word_id` int(11) NOT NULL,
  `mem_id` int(11) NOT NULL,
  `mnemonic` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mnemonics`
--

LOCK TABLES `mnemonics` WRITE;
/*!40000 ALTER TABLE `mnemonics` DISABLE KEYS */;
/*!40000 ALTER TABLE `mnemonics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `word_id` int(11) NOT NULL,
  `notescol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phrases`
--

DROP TABLE IF EXISTS `phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrases` (
  `word_id` int(11) NOT NULL,
  `phrase` text,
  `translation` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phrases`
--

LOCK TABLES `phrases` WRITE;
/*!40000 ALTER TABLE `phrases` DISABLE KEYS */;
/*!40000 ALTER TABLE `phrases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refers`
--

DROP TABLE IF EXISTS `refers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refers` (
  `word_id` int(11) NOT NULL,
  `refer_type` enum('SYN','ANT','REF','DIST','UNDEFINED') DEFAULT NULL,
  `refer_word` varchar(45) DEFAULT NULL,
  `refer_form` varchar(45) DEFAULT NULL,
  `refer_exp` text,
  `notes` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refers`
--

LOCK TABLES `refers` WRITE;
/*!40000 ALTER TABLE `refers` DISABLE KEYS */;
/*!40000 ALTER TABLE `refers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roots`
--

DROP TABLE IF EXISTS `roots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roots` (
  `word_id` int(11) NOT NULL,
  `root` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roots`
--

LOCK TABLES `roots` WRITE;
/*!40000 ALTER TABLE `roots` DISABLE KEYS */;
/*!40000 ALTER TABLE `roots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_fileds`
--

DROP TABLE IF EXISTS `special_fileds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `special_fileds` (
  `word_id` int(11) NOT NULL,
  `filed_name` varchar(45) DEFAULT NULL,
  `explanation` text,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_fileds`
--

LOCK TABLES `special_fileds` WRITE;
/*!40000 ALTER TABLE `special_fileds` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_fileds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_list`
--

DROP TABLE IF EXISTS `word_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word_list` (
  `word_id` int(11) NOT NULL,
  `word` varchar(45) NOT NULL,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_list`
--

LOCK TABLES `word_list` WRITE;
/*!40000 ALTER TABLE `word_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `word_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-02 16:57:59
