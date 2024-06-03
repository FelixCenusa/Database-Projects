// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
/**
 * To verify that mysql is installed and is working.
 * Create a connection to the database and execute
 * a query without actually using the database.
 */
"use strict";

const mysql = require("promise-mysql");
const config = require("./config.json");
const readline = require("readline-promise").default;
const searchLarare = require("./helpers.js");


async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let search = await rl.questionAsync("Search for larare: ");

    //console.log(search)
    const db = await mysql.createConnection(config);
    let result = await searchLarare(db, search);

    console.table(result);

    // const db = await mysql.createConnection(config);
    // let searchFor = "Al"
    // let result = await searchLarare(db, searchFor)

    //let result = await searchLarare(rl, search)

    //let sql = "select * from larare"

    // let sql = `
    // Select *
    //     from larare;`
    // let res = await db.query(sql)

    // for (const row of result) {
    //     console.table(row.fornamn)
    // }

    //console.log(JSON.stringify(res, null, 4))

    //console.table(res)


    rl.close();
    db.end();
}

main();
