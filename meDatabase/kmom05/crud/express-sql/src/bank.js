"use strict";
const mysql = require("promise-mysql");
const config = require("./../config/db/bank.json");


async function showAll() {
    const db = await mysql.createConnection(config);
    let sql = `call get_all();`;

    let res = await db.query(sql);

    //console.log(res);

    return res[0];
}

async function moveToAdam(from, to) {
    const db = await mysql.createConnection(config);
    let sql = `START TRANSACTION;

    UPDATE account 
    SET
        balance = balance - 1.5
    WHERE
        id = ?;
    
    UPDATE account 
    SET
        balance = balance + 1.5
    WHERE
        id = ?;
    
    COMMIT;`;

    await db.query(sql, [from, to]);
}

function exitProgram(exit=0) {
    console.log("Exeting pogram");
    process.exit(exit);
}

function showMenu() {
    console.log(`
    Choose something from the menu:
    
    exit, quit              Exit program
    menu, help              Show this menu
    balance                 Show all Accounts
    move                    Move 1.5 p to Eva from Adam
    `);
}

async function insertBank(data) {
    const db = await mysql.createConnection(config);
    let sql = `call insert_bank(?, ?, ?);`;

    await db.query(sql, [data.id, data.name, data.balance]);
}

async function getOne(id) {
    const db = await mysql.createConnection(config);
    let sql = `select * from account where id = ?`;

    let res = await db.query(sql, [id]);

    return res[0];
}

async function updateBank(data) {
    const db = await mysql.createConnection(config);
    let sql = `update account set name = ?, balance = ? where id = ?;`;

    await db.query(sql, [data.name, data.balance, data.id]);
}

async function deleteBank(id) {
    const db = await mysql.createConnection(config);
    let sql = `delete from account where id = ?;`;

    await db.query(sql, [id]);
}


module.exports = {
    "showAll": showAll,
    "moveToAdam": moveToAdam,
    "exitProgram": exitProgram,
    "showMenu": showMenu,
    "insertBank": insertBank,
    "updateBank": updateBank,
    "getOne": getOne,
    "deleteBank": deleteBank
};
