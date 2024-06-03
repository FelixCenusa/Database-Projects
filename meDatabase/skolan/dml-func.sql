select concat(fornamn," ", efternamn," ", "(",lower(avdelning),")") from larare limit 3;
select fornamn, fodd, current_date() as "Dagens datum", current_time() as "Klocslag" from larare;
select fornamn, fodd, round(((current_date() - fodd)/10000),0) as "Ålder" from larare;
select fornamn, fodd, round(((datediff(current_date(), fodd)/365.24)),0) as "Ålder" from larare;
select fornamn, fodd, monthname(fodd) as "Månad" from larare;
select fornamn, fodd, monthname(fodd) as "Månad" from larare where monthname(fodd) = "May";
select fornamn, fodd, monthname(fodd) as "Månad" from larare where month(fodd) = 5;
select fornamn, fodd, monthname(fodd) as "Månad" from larare where year(fodd) >= 1940 and year(fodd) < 1950;