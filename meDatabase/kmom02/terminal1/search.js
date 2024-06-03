// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
/**
 * To verify that mysql is installed and is working.
 * Create a connection to the database and execute
 * a query without actually using the database.
 */

"use strict";

async function searchLarare(db, what) {
    let sql = `Select * from larare where fornamn like ?
or efternamn like ? or avdelning like ? or kon like ? or kompetens like ?;`;

    let res = await db.query (sql, [`%${what}%`,
        `%${what}%`, `%${what}%`, `%${what}%`, `%${what}%`]);

    return res;
}
const mysql = require("promise-mysql");
const config = require("./config.json");
const readline = require("readline-promise").default;
const printThis = require("./printThis.js");

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const db = await mysql.createConnection(config);
    let search = await rl.questionAsync("Search for larare: ");

    let result = await searchLarare(db, search);

    console.log(`Searching for: ${search}`);
    printThis(result);
    db.end();
}

main();
