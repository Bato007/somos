-- CREANDO LAS TABLAS
CREATE TABLE IF NOT EXISTS somos_user (
  username VARCHAR(20) PRIMARY KEY,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone INT NOT NULL,
  workplace VARCHAR(50) NOT NULL,
  residence VARCHAR(50) NOT NULL,
  church VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS resource (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  available DATE NOT NULL,
  rute VARCHAR(100) NOT NULL,
  token VARCHAR(100) NOT NULL,
);

CREATE TABLE IF NOT EXISTS  category (
  name VARCHAR(60) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS tag (
  name VARCHAR(30) PRIMARY KEY
);

-- CREANDO LAS RELACIONES
CREATE TABLE IF NOT EXISTS  user_resource (
  username VARCHAR(20),
  id VARCHAR(50),
  CONSTRAINT fk_user_resource FOREIGN KEY (username)
		REFERENCES somos_user(username) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_resource_user FOREIGN KEY (id)
  	REFERENCES resource(id)
  	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  user_category (
  username VARCHAR(20),
  category VARCHAR(60),
  CONSTRAINT fk_user_category FOREIGN KEY (username)
  	REFERENCES somos_user(username) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_category_user FOREIGN KEY (category)
  	REFERENCES category(name)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  resource_category (
  id VARCHAR(50),
  category VARCHAR(60),
  CONSTRAINT fk_resource_category FOREIGN KEY (id)
  	REFERENCES resource(id) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_category_resource FOREIGN KEY (category)
  	REFERENCES category(name) 
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS resource_tag (
  id VARCHAR(50),
  tag VARCHAR(30),
  CONSTRAINT fk_resource_tag FOREIGN KEY (id)
  	REFERENCES resource(id) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_tag_resource FOREIGN KEY (tag)
  	REFERENCES tag(name) 
		ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREANDO PROCESOS ALMACENADOS
CREATE OR REPLACE FUNCTION insert_categories(text, text[]) RETURNS VOID AS $$
DECLARE
username ALIAS FOR $1;
categories ALIAS FOR $2;
x text;
	BEGIN
		FOREACH x IN ARRAY categories
		LOOP
			INSERT INTO user_category VALUES (username, x);
		END LOOP;
	END;
$$ LANGUAGE plpgsql;

INSERT INTO category VALUES ('iglesia'), ('somos');
INSERT INTO somos_user VALUES 
('bato', '123', 'hola@gmail.com', 'brandon', 12121212, 'uvg', 'mixco', 'vida real');
INSERT INTO user_category VALUES 
	('bato', 'iglesia'),
	('bato', 'somos');


