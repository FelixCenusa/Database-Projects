-- WHERE --
select * from larare where avdelning = "DIDD";
select * from larare where akronym like  "h%";
select * from larare where fornamn like  "%o%";
select * from larare where lon <= 50000 and lon >= 30000;
select * from larare where kompetens < 7 and lon > 40000;
select * from larare where akronym in ("sna", "dum", "min");
select * from larare where lon > 80000 or kompetens = 2 and avdelning = "ADM";

select fornamn, lon from larare ORDER BY efternamn desc;
select fornamn, lon from larare ORDER BY efternamn asc;
select fornamn, lon from larare order by lon desc;
select fornamn, lon from larare order by lon asc;
select fornamn as "Name",lon as "Top 3 salaries" from larare order by lon desc limit 3;

--
-- Change namn of a column
--
select * from larare;
SELECT
    fornamn AS 'Lärare',
    lon AS 'Lön',
    avdelning as "AvdelningXD"
FROM larare;