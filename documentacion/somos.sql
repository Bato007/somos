-- CREANDO LAS TABLAS
CREATE TABLE user (
  username VARCHAR(20) PRIMARY KEY,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone INT NOT NULL,
  workplace VARCHAR(50) NOT NULL,
  residence VARCHAR(50) NOT NULL,
  church VARCHAR(50)
);

CREATE TABLE resource (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(50),
  available DATE NOT NULL,
  rute VARCHAR(50) NOT NULL
);

CREATE TABLE category (
  name VARCHAR(60) PRIMARY KEY
);

CREATE TABLE tag (
  name VARCHAR(30) PRIMARY KEY
);

-- CREANDO LAS RELACIONES
CREATE TABLE user_resource (
  username VARCHAR(20),
  id VARCHAR(50),
  CONSTRAINT fk_on  _user FOREIGN KEY (username)
	REFERENCES user(username) 
	ON DELETE OR UPDATE CASCADE,
  CONSTRAINT fk_resource_user FOREIGN KEY (id)
  REFERENCES resource(id)
  ON DELETE OR UPDATE CASCADE
);


