

-- 
-- Delete
--
delete from fenomen;
delete from problem;
delete from satellit;
delete from satellit2fenomen;
delete from satellit2problem;

--
-- Insert into fenomen
--
LOAD DATA LOCAL INFILE 'csv/fenomen.csv'
INTO TABLE fenomen
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into problem
--
LOAD DATA LOCAL INFILE 'csv/problem.csv'
INTO TABLE problem
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into satellit
--
LOAD DATA LOCAL INFILE 'csv/satellit.csv'
INTO TABLE satellit
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into satellit2fenomen
--
LOAD DATA LOCAL INFILE 'csv/satellit2fenomen.csv'
INTO TABLE satellit2fenomen
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into satellit2problem
--
LOAD DATA LOCAL INFILE 'csv/satellit2problem.csv'
INTO TABLE satellit2problem
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
-- insert into satellit2fenomen (produktid, problem) values ("123","the big bang");
-- insert into satellit2fenomen (produktid, problem) values ("123","the milky way");
-- insert into satellit2fenomen (produktid, problem) values ("123","mars");


-- insert into satellit2problem(produktid, antal, hylla) values ("123","Nothing");
-- insert into satellit2problem(produktid, antal, hylla) values ("123","Exploded");
-- insert into satellit2problem(produktid, antal, hylla) values ("123","No Power");




