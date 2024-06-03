--
-- Example transactions
--
CREATE DATABASE IF NOT EXISTS BANK;
USE BANK;
DROP TABLE IF EXISTS account;
CREATE TABLE account
(
    `id` CHAR(4) PRIMARY KEY,
    `name` VARCHAR(20),
    `balance` DECIMAL(10, 2)
);

-- DELETE FROM account;
INSERT INTO account
VALUES
    ("1111", "Adam", 10.0),
    ("2222", "Eva", 7.0),
    ("3333", "PrettyTest1", 5.0),
    ("4444", "PrettyTest2", 3.0),
    ("5555", "PrettyTest3", 1.0)
;

SELECT * FROM account;

--
-- Move the money
--
UPDATE account
SET
    balance = balance + 1.5
WHERE
    id = "2222";

UPDATE account
SET
    balance = balance - 1.5
WHERE
    id = "1111";

SELECT * FROM account;

--
-- Move the money, within a transaction
--
START TRANSACTION;

UPDATE account
SET
    balance = balance + 1.5
WHERE
    id = "2222";

UPDATE account
SET
    balance = balance - 1.5
WHERE
    id = "1111";

COMMIT;

SELECT * FROM account;