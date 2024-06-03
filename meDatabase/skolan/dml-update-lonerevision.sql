-- SELECT SUM(lon) AS Lönesumma, SUM(kompetens) AS Kompetens FROM larare;
-- ALTER TABLE larare ADD COLUMN if not exists lonepott INT default (lon * 0.064);
-- select lon,lonepott from larare;
-- SELECT SUM(lon) AS 'Lonesumma', SUM(lonepott) AS lonepott FROM lxarare;
-- Show the sum of the 6.4% of the salaries.
SELECT 
    SUM(lon) AS 'Lonesumma',
    SUM(ROUND((lon * 0.064), 0)) AS lonepott
FROM
    larare;

select * from larare;
-- select sum(lon) into @sum from larare;
set @sum = (select sum(lon) from larare);
-- ALTER TABLE larare ADD COLUMN LonGamla ;

UPDATE larare SET kompetens = 7, lon = 85000 WHERE fornamn IN ('Albus');
UPDATE larare SET lon = lon + 4000 WHERE fornamn IN ('Minerva');
UPDATE larare SET kompetens = 3, lon = lon + 2000 WHERE fornamn = ('Argus');
UPDATE larare SET lon = lon - 3000 WHERE fornamn in ('Gyllenroy','Alastor');
UPDATE larare SET lon = (lon * 1.02) WHERE avdelning = ('DIDD');
UPDATE larare SET lon = (lon * 1.03) WHERE kon = ('K') and lon < 40000;
UPDATE larare SET lon = (lon + 5000), kompetens = kompetens + 1 WHERE fornamn in ('Severus', 'Minerva', 'Hagrid');
update larare set lon = lon * 1.022 where fornamn not in ("Albus", "Severus", "Minerva", "Hagrid");
select * from larare;
SELECT SUM(lon) AS 'Lönesumma', SUM(kompetens) AS Kompetens, round(((sum(lon) - @sum) / @sum * 100),4) as LoneSummaOkning FROM larare;
