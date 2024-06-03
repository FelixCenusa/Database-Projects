--
-- Create scheme for database skolan.
--
--
-- Create table: larare
--
use skolan;
DROP TABLE IF EXISTS kurstillfalle;
DROP TABLE IF EXISTS kurs;

DROP TABLE IF EXISTS larare;
CREATE TABLE larare
(
    akronym CHAR(3),
    avdelning CHAR(4),
    fornamn VARCHAR(20),
    efternamn VARCHAR(20),
    kon CHAR(1),
    lon INT,
    fodd DATE,
    kompetens INT default 1 not null,

    PRIMARY KEY (akronym)
);
show tables;
select * from larare;
-- resten av CREATE statementet.
-- source ddl-larare.sql
source ddl-copy.sql
source dml-view.sql
source dml-join.sql
	
--
-- Create table: kurs
--

CREATE TABLE kurs
(
    -- All columns and their definitions

   
    kod CHAR(6) primary key not null,
    namn VARCHAR(40),
    poang FLOAT,
    niva CHAR(3)
);

-- create table kurstillfelle

CREATE TABLE kurstillfalle
(
    -- All columns and their definitions
	id int auto_increment primary key not null,
    kurskod CHAR(6) not null,
    kursansvarig CHAR(3) not null,
    lasperiod int not null,
    
    FOREIGN KEY (kurskod) REFERENCES kurs(kod),
    FOREIGN KEY (kursansvarig) REFERENCES larare(akronym)

    
);
source insert-csv.sql; -- har lagt till detta själv här, ska det vara med?
source dml-join2.sql;



-- triple join view 
DROP VIEW IF EXISTS v_planering;
CREATE VIEW v_planering AS 
SELECT * FROM kurs AS k
    JOIN kurstillfalle AS kt
        ON k.kod = kt.kurskod
    JOIN larare AS l
        ON l.akronym = kt.kursansvarig;




