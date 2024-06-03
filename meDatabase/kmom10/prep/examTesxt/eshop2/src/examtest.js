"use strict";
const mysql = require("promise-mysql");
const config = require("../config/db/examtest.json");

async function getKategori() {
    const db = await mysql.createConnection(config);
    let sql = `call get_kategori();`;

    let res = await db.query(sql);

    return res[0];
}


async function showAll() {
    const db = await mysql.createConnection(config);
    let sql = `call showall();`;
    let res = await db.query(sql);

    return res[0];
}

async function showAllButUrls() {
    const db = await mysql.createConnection(config);
    let sql = `call showallbuturls();`;
    let res = await db.query(sql);

    return res[0];
}

function exitProgram(exit=0) {
    console.log("Exeting pogram");
    process.exit(exit);
}

function showMenu() {
    console.log(`
    Choose something from the menu:
    
    exit, quit                              Exit program
    menu, help                              Show this menu
    about                                   Show Author
    visa                                    Show all information
    search <searchword>                     Search for information
    report                                  Show report
    `);
}

async function searchAllWeb(what) {
    const db = await mysql.createConnection(config);
    let sql = `call searchall(?);`;

    let res = await db.query(sql, [`%${what}%`]);

    console.log(res);
    return res[0];
}

async function searchAllCli(what) {
    const db = await mysql.createConnection(config);
    let sql = `call searchallbuturls(?);`;

    let res = await db.query(sql, [`%${what}%`]);

    return res[0];
}

function report() {
    let reportThis = `
+--------------------+--------------------------------------+--------------------------------------------+-------+
| Namn               | Fenomen                              | Problem                                    | Dagar |
+--------------------+--------------------------------------+--------------------------------------------+-------+
| 1998-72B: Astrid 2 | Norrsken (NOR)                       | Lost contact (LOS)                         |   226 |
| 1992-64A: Freja    | Norrsken (NOR)                       | Radiation (RAD)                            |  1469 |
| 2000-75C: Munin    | Norrsken (NOR)                       | Computer failure (COMP)                    |    83 |
| 2001-07A: Odin     | Ozonlagret (OZO), Himlakroppar (HIM) | NULL                                       |  NULL |
| 1989-67A: Sirius 1 | NULL                                 | NULL                                       |  4995 |
| 1986-19B: Viking   | Norrsken (NOR)                       | No batteri (BAT) + Component failure (COM) |   449 |
+--------------------+--------------------------------------+--------------------------------------------+-------+
`;

    console.log(reportThis);
    return reportThis;
}


module.exports = {
    "getKategori": getKategori,
    "showAll": showAll,
    "exitProgram": exitProgram,
    "showMenu": showMenu,
    "showAllButUrls": showAllButUrls,
    "searchAllWeb": searchAllWeb,
    "searchAllCli": searchAllCli,
    "report": report
};
