--
-- Update a column value
--
UPDATE larare SET lon = 30000 WHERE akronym = 'gyl';

UPDATE larare
    SET
        lon = 30000
    WHERE
        akronym = 'gyl'
        OR akronym = 'ala'
;

UPDATE larare
    SET
        lon = 30000
    WHERE
        akronym IN ('gyl', 'ala')
;

UPDATE larare
    SET
        lon = 30000
    WHERE
        lon IS NULL
;

select * from larare;
SELECT SUM(lon) AS 'Lönesumma', SUM(kompetens) AS Kompetens FROM larare;
SELECT akronym, avdelning, fornamn, kon, lon, kompetens FROM larare ORDER BY lon desc;