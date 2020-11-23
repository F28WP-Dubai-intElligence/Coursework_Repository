create database game;
use game;


CREATE TABLE IF NOT EXISTS gamer (
  num_gamer int(11) NOT NULL auto_increment,
  email_addres varchar(40) default NULL,
  username varchar(40) default NULL,
  passwords varchar(40) default NULL, 
  score 
  PRIMARY KEY  (num_client)
) ;


INSERT INTO gamer VALUES (1,'sk@gmail.com','Paul_Masson','Apxt2358');

CREATE TABLE  IF NOT EXISTS outstanding (
  num_gamer int(11) NOT NULL default '0',
  score int(10) default 0,
  PRIMARY KEY  (num_client),
  CONSTRAINT `0_53` FOREIGN KEY (`num_gamer`) REFERENCES `gamer` (`num_gamer`)
) ;

INSERT INTO gamer VALUES (1,10);
