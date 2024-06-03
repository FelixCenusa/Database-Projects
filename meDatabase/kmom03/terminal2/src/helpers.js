"use strict";
const mysql = require("promise-mysql");
const config = require("../config.json");

async function searchLarare(what) {
    const db = await mysql.createConnection(config);
    let sql = `SELECT akronym AS Akrönym, fornamn AS Förnamn, efternamn AS Efternämn,
        kon AS Kön, lon AS Lön, kompetens AS Kömpetens,
        DATE_FORMAT(fodd, '%Y-%m-%d') AS Född FROM larare WHERE fornamn LIKE ?;`;

    let res = await db.query(sql, [`%${what}%`]);

    return res;
}

async function showAllLarare() {
    const db = await mysql.createConnection(config);
    let sql = `SELECT akronym AS Akronym, fornamn AS Fornamn, efternamn AS Efternamn, 
        kon AS Kon, lon AS Lon, kompetens AS Kompetens,
        DATE_FORMAT(fodd, '%Y-%m-%d') AS Född
        FROM larare;`;
    let res = await db.query(sql);

    return res;
}

async function kompetensChange() {
    const db = await mysql.createConnection(config);
    let sql = `SELECT akronym, fornamn, efternamn, prekomp, nukomp,
diffkomp FROM v_lonerevision ORDER BY nukomp DESC, diffkomp DESC;`;

    let res = await db.query(sql);

    return res;
}


async function lonChange() {
    const db = await mysql.createConnection(config);
    let sql = `SELECT akronym, fornamn, efternamn, pre AS prekomp, nu AS nukomp,
diff, proc, mini FROM v_lonerevision ORDER BY proc DESC;`;

    let res = await db.query(sql);

    return res;
}

async function nylon(akronym, lon) {
    const db = await mysql.createConnection(config);
    let sql = `UPDATE larare SET lon = ? WHERE akronym = ?;`;

    await db.query(sql, [lon, akronym]);
}

module.exports = {
    "searchLarare": searchLarare,
    "showAllLarare": showAllLarare,
    "kompetensChange": kompetensChange,
    "lonChange": lonChange,
    "nylon": nylon
};
