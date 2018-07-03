CREATE TABLE IF NOT EXISTS `learning` (
  `learning_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `learn_date` date NOT NULL,
  `review_date` date DEFAULT NULL,
  `familiarity` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`learning_id`),
  UNIQUE KEY `id_UNIQUE` (`learning_id`),
  KEY `fk_learning_2_idx` (`word_id`),
  KEY `fk_learning_1` (`user_id`),
  CONSTRAINT `fk_learning_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_learning_2` FOREIGN KEY (`word_id`) REFERENCES `word_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
