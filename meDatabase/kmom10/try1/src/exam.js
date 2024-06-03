"use strict";
const mysql = require("promise-mysql");
const config = require("../config/db/exam.json");

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
    search <str>                            Search for information
    report                                  Show report
    `);
}

async function searchAllWeb(what) {
    const db = await mysql.createConnection(config);
    let sql = `call searchallnopicnodevsinfo(?);`;

    let res = await db.query(sql, [`%${what}%`]);

    console.log(res);
    return res[0];
}

async function searchAllCli(what) {
    const db = await mysql.createConnection(config);
    let sql = `call searchallnourlsnopicnodevsinfo(?);`;

    let res = await db.query(sql, [`%${what}%`]);

    return res[0];
}

function report() {
    let reportThis = `
    +----------------------------------------------------------------------------+
--------------------------------------------+------+----------------------+
    | Product                                                                    |
 Type                                       | Year | Developer            |
    +----------------------------------------------------------------------------+
--------------------------------------------+------+----------------------+
    | Navlab 1 (NAVLAB1)............ - Warp supercomputer                        |
 SAV|Autonomous and semi-autonomous vehicle | 1986 | CMU - Carnegie Mello |
    | Logic Theorist (LOGTHE)....... - The first artificial intelligence program |
 AUR|Automated reasoning                    | 1956 | AHC - Allen Newell,  |
    | Navlab 5 (NAVLAB5)............ - From Pittsburgh to San Diego              |
 SAV|Autonomous and semi-autonomous vehicle | 1995 | CMU - Carnegie Mello |
    | Manchester Mark 1 (MARK1)..... - Electronic brain                          |
 SPC|Stored-program computer                | 1949 | VUM - Victoria Unive |
    | Deep Blue (DEEPBLU)........... - Alien opponent                            |
 CES|Chess-playing expert system            | 1997 | CMU - Carnegie Mello |
    | NULL                                                                       |
 GEN|Generative artificial intelligence     | NULL | .................... |
    | NULL                                                                       |
                                            | NULL | OAI - Open AI....... |
    +----------------------------------------------------------------------------+
--------------------------------------------+------+----------------------+
    `;

    console.log(reportThis);
    return reportThis;
}



module.exports = {
    "getKategori": getKategori,
    "showAll": showAll,
    "showAllButUrls": showAllButUrls,
    "exitProgram": exitProgram,
    "showMenu": showMenu,
    "searchAllWeb": searchAllWeb,
    "searchAllCli": searchAllCli,
    "report": report
};
