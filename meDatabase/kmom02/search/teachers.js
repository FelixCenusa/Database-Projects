// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
/**
 * To verify that mysql is installed and is working.
 * Create a connection to the database and execute
 * a query without actually using the database.
 */
"use strict";

const mysql = require("promise-mysql");
const config = require("./config.json");
/**
 * Main function.
 * @async
 * @returns void
 */

(async function() {
    const db = await mysql.createConnection(config);
    let sql;
    let rizz;
    let data;
    let str;


    sql = `
    SELECT
    akronym,
    fornamn,
    efternamn,
    avdelning,
    kompetens,
    lon
    FROM larare
    ORDER BY akronym;
    `;
    rizz = await db.query(sql);
    data = JSON.stringify(rizz, null, 4);
    console.table(data);

    // Loop through each row the resultset
    for (const row of rizz) {
        console.info(row);
    }

    // Output as formatted text in table

    str  = "+-----------+---------------------+-----------+----------+\n";
    str += "| Akronym   | Namn                | Avdelning |   Lön    |\n";
    str += "|-----------|---------------------|-----------|----------|\n";
    for (const row of rizz) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.avdelning.padEnd(10);
        str += "| ";
        str += row.lon.toString().padStart(8);
        str += " |\n";
    }
    str += "+-----------+---------------------+-----------+----------+\n";
    console.info(str);

    console.table(rizz);

    db.end();
})();
