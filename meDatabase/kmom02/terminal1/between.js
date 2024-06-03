// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
// visar samma information som search.js, men man kan söka/filtrera och visa alla värden
//mellan två värden. Man låter användaren mata in min och max och visar sedan alla löner
//och kompetenser som är mellan dessa två värden.
"use strict";
async function betweenLarare(db, min, max) {
    let sql = `Select * from larare where lon
 >= ? and lon <= ? or kompetens >= ? and kompetens <= ?;`;

    let res = await db.query(sql, [min, max, min, max]);

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
    let min = await rl.questionAsync("Search between MIN: ");

    let max = await rl.questionAsync("Search between MAX: ");

    let result = await betweenLarare(db, min, max);

    console.log(`Searching for values between ${min} - ${max}`);
    printThis(result);
    db.end();
}

main();
