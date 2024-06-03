use skolan;
--
-- Create table: kurs
--
DROP TABLE IF EXISTS kurstillfalle;
DROP TABLE IF EXISTS kurs;
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
-- INSERT INTO kurs VALUES ('sna', 'DIPT', '1.2', 'Sne');
select * from kurs;
SHOW DATABASES;
SHOW DATABASES LIKE "%kurs%";



