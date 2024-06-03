

-- 
-- Delete
--
delete from product;
delete from type;
delete from developer;
delete from product2type;

-- 
-- Insert into developer
--
LOAD DATA LOCAL INFILE 'csv/developer.csv'
INTO TABLE developer
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;
--
-- Insert into product
--
LOAD DATA LOCAL INFILE 'csv/product.csv'
INTO TABLE product
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

-- 
-- Insert into type
--
LOAD DATA LOCAL INFILE 'csv/type.csv'
INTO TABLE type
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;


-- 
-- Insert into product2type
--
LOAD DATA LOCAL INFILE 'csv/product2type.csv'
INTO TABLE product2type
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

