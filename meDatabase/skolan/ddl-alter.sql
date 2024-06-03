-- Add column to table
ALTER TABLE larare ADD COLUMN if not exists kompetens INT;

ALTER TABLE LARARE DROP COLUMN kompetens;

ALTER TABLE larare ADD COLUMN kompetens INT default 1 not null;

SELECT akronym, fornamn, kompetens FROM larare;
show columns from larare;