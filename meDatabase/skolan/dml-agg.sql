use skolan;
select * from larare;
select sum(lon) as "Sum of Lon" from larare;
select max(lon) as "Max Lon" from larare;
select min(lon) as "Min Lon" from larare;

select avdelning, AVG(kompetens) as "Default AVG" from larare group by avdelning order by kompetens desc;
select avdelning, sum(kompetens) / count(kon) as "Manual AVG" from larare group by avdelning order by kompetens desc;

SELECT avdelning, kompetens, SUM(lon) AS Summa FROM larare GROUP BY avdelning , kompetens ORDER BY Summa DESC;

-- 1
select avdelning, count(kon) as people from larare group by avdelning order by people desc;

-- 2
select avdelning, sum(lon) as SumMoney from larare group by avdelning order by SumMoney desc;

-- 3
select avg(lon) as "Average Salary", avdelning from larare group by avdelning order by lon desc;

-- 4
select kon, round(avg(lon),0) as "AvgSal" from larare group by kon order by lon desc;

-- cout << idk 1.1;

select avdelning, avg(kompetens) as "Average Competence" from larare group by avdelning order by "Average Competence" desc limit 1; -- wtf

select avdelning, kompetens, round(lon) as RoundedLon, COUNT(*) as Antal from larare group by avdelning, lon;





SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal FROM larare GROUP BY avdelning ORDER  BY avdelning; -- same
SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal FROM larare GROUP BY avdelning ORDER  BY Snittlon desc; -- same
SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal FROM larare GROUP BY avdelning ORDER  BY round(avg(lon)) desc;-- same


select avdelning, ROUND(AVG(lon)) AS snittlon, count(kon) as Amount from larare group by avdelning having snittlon > 35000 order by snittlon desc;
select avdelning, ROUND(AVG(lon)) AS snittlon, count(kon) as Amount from larare group by avdelning having Amount >= 3 order by snittlon desc;

select avdelning, round(avg(lon)) as snittlon, count(kon) as amount from larare where kompetens = 1 group by avdelning order by snittlon desc;
SELECT akronym, avdelning, lon FROM larare WHERE kompetens = 1 and avdelning = 'DIPT';

-- RAPORT AGAIN 
-- 1
select avdelning, round(avg(lon)) as snittlon, count(kon) as amount from larare group by avdelning order by snittlon desc;
-- 2
select avdelning, kompetens, round(avg(lon)) as snittlon, count(kon) as amount from larare group by avdelning, kompetens order by avdelning, kompetens desc;
-- 3
select avdelning, kompetens, round(avg(lon)) as snittlon, count(kon) as amount from larare group by avdelning, kompetens having kompetens <= 3 order by avdelning, kompetens desc;
-- 4
select avdelning, kompetens, round(avg(lon)) as snittlon, count(kon) as amount from larare group by avdelning, kompetens having kompetens <= 3 and amount <= 1 and  snittlon <= 45000 and snittlon >= 30000 order by snittlon desc;