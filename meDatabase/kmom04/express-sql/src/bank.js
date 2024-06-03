"use strict";
const mysql = require("promise-mysql");
const config = require("../config/db/bank.json");

async function searchPerson(what) {
    const db = await mysql.createConnection(config);
    let sql = `SELECT id AS ID, name AS Name, balance AS Balance FROM account;`;

    let res = await db.query(sql, [`%${what}%`]);

    return res;
}

async function showAll() {
    const db = await mysql.createConnection(config);
    let sql = `SELECT id AS ID, name AS Name, balance AS Balance FROM account;`;
    let res = await db.query(sql);

    return res;
}

async function move(amount, from, to) {
    const db = await mysql.createConnection(config);
    let sql = `START TRANSACTION;UPDATE account SET balance = balance - ? WHERE id = ?;
UPDATE account SET balance = balance + ? WHERE id = ?;COMMIT;`;

    await db.query(sql, [amount, from, amount, to]);
}



module.exports = {
    "searchPerson": searchPerson,
    "showAll": showAll,
    "move": move
};
