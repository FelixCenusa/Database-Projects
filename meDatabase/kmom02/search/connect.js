// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
/**
 * To verify that mysql is installed and is working.
 * Create a connection to the database and execute
 * a query without actually using the database.
 */
"use strict";

const mysql = require("promise-mysql");

async function main() {
    const db = await mysql.createConnection({
        "host":     "MAC-KILLER-PRO.local",
        "user":     "dbadm",
        "password": "P@ssw0rd",
        "database": "skolan"
    });
    let sql = "select * from larare";
    let res = await db.query(sql);

    console.log(res);

    db.end();
}

main();





// /**
//  * Main function.
//  * @async
//  * @returns void
//  */
// (async function() {
//     let sql;
//     let res;
//     const db = await mysql.createConnection({
//         "host":     "MAC-KILLER-PRO.local",
//         "user":     "dbadm",
//         "password": "P@ssw0rd",
//         "database": "skolan"
//     });

//     sql = "SELECT 1+1 AS Sum";
//     res = await db.query(sql);

//     console.table(res);

//     db.end();
// })();
