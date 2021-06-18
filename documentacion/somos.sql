-- CREANDO LAS TABLAS
CREATE TABLE IF NOT EXISTS somos_user (
  username VARCHAR(20) PRIMARY KEY,
  password TEXT NOT NULL,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone INT NOT NULL,
  workplace VARCHAR(50) NOT NULL,
  residence VARCHAR(50) NOT NULL,
  church VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS resource (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(20),
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  available DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  url VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  name VARCHAR(60) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS tag (
  name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS announcement (
  id VARCHAR(70) PRIMARY KEY,
  contact VARCHAR(20),
  phone INT,
  email VARCHAR(20),
  title VARCHAR(20),
  description VARCHAR(200),
  toDate DATE,
  published BOOLEAN,
  type VARCHAR(20)
);

-- CREANDO LAS RELACIONES
CREATE TABLE IF NOT EXISTS user_resource (
  username VARCHAR(20),
  id VARCHAR(50),
  CONSTRAINT fk_user_resource FOREIGN KEY (username)
		REFERENCES somos_user(username) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_resource_user FOREIGN KEY (id)
  	REFERENCES resource(id)
  	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_category (
  username VARCHAR(20),
  category VARCHAR(60),
  CONSTRAINT fk_user_category FOREIGN KEY (username)
  	REFERENCES somos_user(username) 
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_category_user FOREIGN KEY (category)
  	REFERENCES category(name)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS resource_category (
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

---------- CREANDO PROCESOS ALMACENADOS ----------
CREATE OR REPLACE FUNCTION insert_categories(text, text[]) 
RETURNS VOID AS $$
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

CREATE OR REPLACE FUNCTION insert_resource_info(text, text[], text[], text[]) 
RETURNS VOID AS $$ 
DECLARE
id ALIAS FOR $1;
tags ALIAS FOR $2;
category ALIAS FOR $3;
users ALIAS FOR $4;
x text;
	BEGIN
		FOREACH x IN ARRAY tags
		LOOP
			INSERT INTO resource_tag VALUES (id, x);
		END LOOP;

    FOREACH x IN ARRAY category
		LOOP
			INSERT INTO resource_category VALUES (id, x);
		END LOOP;

    FOREACH x IN ARRAY users
		LOOP
			INSERT INTO user_resource VALUES (x, id);
		END LOOP;

	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION clear_resource(text) 
RETURNS VOID AS $$ 
DECLARE
aux_id ALIAS FOR $1;
	BEGIN
		DELETE FROM resource_tag WHERE id = aux_id;
    DELETE FROM user_resource WHERE id = aux_id;
    DELETE FROM resource_category WHERE id = aux_id;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_resources(text, text[]) 
RETURNS TABLE (
		id VARCHAR(50),
		title VARCHAR(50),
		resource VARCHAR(50)
	) AS $$ 
DECLARE
temp_username ALIAS FOR $1;
categories ALIAS FOR $2;
x text;
	BEGIN
		DROP TABLE IF EXISTS aux;
		CREATE TEMP TABLE aux (
			id VARCHAR(50),
			title VARCHAR(50),
			type VARCHAR(50),
			available DATE
		);
		
		FOREACH x IN ARRAY categories
		LOOP
			INSERT INTO aux
				(SELECT P1.id, P1.title, P1.type, P1.available
				FROM (resource NATURAL JOIN resource_category) P1
				WHERE P1.category = x);
		END LOOP;

		INSERT INTO aux
				(SELECT P1.id, P1.title, P1.type, P1.available
				FROM (resource NATURAL JOIN user_resource) P1
				WHERE P1.username = temp_username);

		RETURN QUERY (
			SELECT DISTINCT aux.id, aux.title, aux.type
			FROM aux
			WHERE aux.available >= current_date
		);
	END;
$$ LANGUAGE plpgsql;

INSERT INTO category VALUES ('iglesia'), ('somos');
INSERT INTO somos_user VALUES 
('bato', '123', 'hola@gmail.com', 'brandon', 12121212, 'uvg', 'mixco', 'vida real');
INSERT INTO user_category VALUES 
	('bato', 'iglesia'),
	('bato', 'somos');
INSERT INTO resource VALUES
	('id', 'title', 'descr', '2021-06-03', 'pdf', 'url'),
	('id2', 'title', 'descr', '2021-06-05', 'jpg', 'url'),
	('id3', 'title', 'descr', '2021-06-01', 'doc', 'url');	
INSERT INTO resource_category VALUES
	('id', 'iglesia'),
	('id', 'somos'),
	('id2', 'iglesia'),
	('id3', 'somos');
INSERT INTO tag VALUES
	('prueba');
SELECT * FROM get_resources('bato', ARRAY['somos', 'iglesia']); 