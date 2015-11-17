CREATE DATABASE tickitDB;

USE tickitDB;

CREATE TABLE users (

  id int NOT NULL AUTO_INCREMENT,
  userName varchar(50) NOT NULL,
  firstName varchar(20) NOT NULL,
  lastName varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  ticketRedeemed int(5),
  ticketSent int(5),
  ticketAvailable int(5),
  PRIMARY KEY (id),
  UNIQUE (userName)

  /*Credit card*/
  /*Image*/

);

CREATE TABLE tickets (

  id int NOT NULL AUTO_INCREMENT,
  redeemed boolean,
  sentBy int NOT NULL,
  receivedBy int NOT NULL,
  sentAt TIMESTAMP,
  message varchar(140),
  PRIMARY KEY (id)

);
