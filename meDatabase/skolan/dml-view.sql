SELECT CONCAT(fornamn, ' ', efternamn, ' (', LOWER(avdelning), ')') AS namn, (TIMESTAMPDIFF(year, fodd, CURDATE())-6) AS alder FROM larare;
drop view if exists v_namn_alder;
CREATE VIEW v_namn_alder AS SELECT CONCAT(fornamn, ' ', efternamn, ' (', LOWER(avdelning), ')') AS namn, (TIMESTAMPDIFF(year, fodd, CURDATE())-6) AS alder FROM larare;
SELECT * FROM v_namn_alder WHERE Namn LIKE '%di%' ORDER BY alder DESC LIMIT 3;

select * from larare;
drop view if exists v_larare;
create view v_larare as select *, (TIMESTAMPDIFF(year, fodd, CURDATE())-6) AS alder from larare;
SELECT * FROM v_larare ORDER BY alder;