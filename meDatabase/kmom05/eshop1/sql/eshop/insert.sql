

-- 
-- Delete
--
delete from kund;
delete from kategori;
delete from lager;
delete from produkt;
delete from produkt2kategori;
delete from produkt2lager;

--
-- Insert into kund
--
LOAD DATA LOCAL INFILE 'csv/kund.csv'
INTO TABLE kund
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into kategori
--
LOAD DATA LOCAL INFILE 'csv/kategori.csv'
INTO TABLE kategori
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into lager
--
LOAD DATA LOCAL INFILE 'csv/lager.csv'
INTO TABLE lager
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into produkt
--
LOAD DATA LOCAL INFILE 'csv/produkt.csv'
INTO TABLE produkt
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into produkt2kategori
--
LOAD DATA LOCAL INFILE 'csv/produkt2kategori.csv'
INTO TABLE produkt2kategori
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into produkt2lager
--
LOAD DATA LOCAL INFILE 'csv/produkt2lager.csv'
INTO TABLE produkt2lager
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- fix
--
insert into produkt2kategori (produktid, kategori) values ("kaffemix1", "mugg");
insert into produkt2kategori (produktid, kategori) values ("te1", "mugg");
insert into produkt2kategori (produktid, kategori) values ("skiva1", "dbwebb");

insert into produkt2lager(produktid, antal, hylla) values ("kaffemix1", 5, "C:101");
insert into produkt2lager(produktid, antal, hylla) values ("skiva1", 2, "A:102");

--
-- Select
--
select * from kund;
select * from kategori;
select * from lager;
select * from produkt;
select * from produkt2kategori;
select * from produkt2lager;
