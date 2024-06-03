--
-- Add teacher staff
DELETE FROM larare;
INSERT INTO larare 
(akronym, avdelning, fornamn, efternamn, kon, lon, fodd, kompetens)
VALUES ('sna', 'DIPT', 'Severus', 'Snape', 'M', 40000, '1951-05-01', '1');

INSERT INTO larare 
(akronym, avdelning, fornamn, efternamn, kon, lon, fodd, kompetens)
VALUES ('dum', 'ADM', 'Albus', 'Dumbledore', 'M', 80000, '1941-04-01', '1');

INSERT INTO larare 
(akronym, avdelning, fornamn, efternamn, kon, lon, fodd, kompetens)

VALUES ('min', 'DIDD', 'Minerva', 'McGonagall', 'K', 40000, '1955-05-05', '1');

INSERT INTO larare
(akronym, avdelning, fornamn, efternamn, kon, lon, fodd, kompetens)
 VALUES
    ('hag', 'ADM', 'Hagrid', 'Rubeus', 'M', 25000, '1956-05-06', '1'),
    ('fil', 'ADM', 'Argus', 'Filch', 'M', 25000, '1946-04-06', '1'),
    ('hoc', 'DIDD', 'Madam', 'Hooch', 'K', 35000, '1948-04-08', '1')
;

INSERT INTO larare
    (akronym, avdelning, fornamn, efternamn, kon, fodd)
VALUES
    ('gyl', 'DIPT', 'Gyllenroy', 'Lockman', 'M', '1952-05-02'),
    ('ala', 'DIPT', 'Alastor', 'Moody', 'M', '1943-04-03')
;

show tables;
select * from larare;