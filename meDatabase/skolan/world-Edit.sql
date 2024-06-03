use world;
SHOW tables;

SELECT 
    co.`Code`,
    co.`Name` AS 'Country',
    ca.`Name` AS 'Capital',
    GROUP_CONCAT(la.`Language`) AS 'Language',
    co.`Region`,
    co.`Continent`,
    co.`LifeExpectancy`
FROM `country` AS co
    JOIN `city` AS ca
        ON ca.`ID` = co.`Capital`
    JOIN `countrylanguage` AS la
        ON co.`Code` = la.`CountryCode` 
WHERE
    `IsOfficial` = 'T'
    AND `LifeExpectancy` IS NOT NULL
    -- AND co.`Region` LIKE 'Nordic%'
    -- AND co.`Continent` = 'Europe'
GROUP BY
    co.`code`
ORDER BY
    co.`LifeExpectancy` DESC
LIMIT 10
;
