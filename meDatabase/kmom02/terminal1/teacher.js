// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
/**
 * To verify that mysql is installed and is working.
 * Create a connection to the database and execute
 * a query without actually using the database.
 */

"use strict";
async function allLarare(db) {
    let sql = `Select * from larare`;

    let res = await db.query(sql);

    return res;
}
const mysql = require("promise-mysql");
const config = require("./config.json");
const printThis = require("./printThis.js");

async function main() {
    const db = await mysql.createConnection(config);
    let result = await allLarare(db);

    printThis(result);
    db.end();
}

main();
