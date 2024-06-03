--
-- JOIN
--
SELECT 
    l.akronym,
    l.lon,
    l.kompetens,
    p.lon AS 'pre-lon',
    p.kompetens AS 'pre-kompetens'
FROM
    larare AS l
        JOIN
    larare_pre AS p ON l.akronym = p.akronym
ORDER BY akronym;
drop view if exists v_lonerevision;
CREATE VIEW v_lonerevision AS
    SELECT 
        l.akronym as akronym,
        l.fornamn as fornamn,
        l.efternamn as efternamn,
        p.lon AS pre,
        l.lon as nu,
        (l.lon - p.lon) as diff,
        p.kompetens as prekomp,
        l.kompetens as nukomp,
        (l.kompetens - p.kompetens) as diffkomp,
        round((((l.lon - p.lon)/p.lon)* 100),2) as proc,
        case when round((((l.lon - p.lon)/p.lon)* 100),2) > 3 then "ok" else "nok" end as mini
    FROM
        larare as l
        JOIN
    larare_pre AS p ON l.akronym = p.akronym
ORDER BY akronym desc;
SELECT akronym, fornamn, efternamn, pre as prekomp, nu as nukomp, diff, proc, mini FROM v_lonerevision ORDER BY proc DESC;
SELECT akronym, fornamn, efternamn, prekomp, nukomp, diffkomp FROM v_lonerevision ORDER BY nukomp DESC, diffkomp DESC;