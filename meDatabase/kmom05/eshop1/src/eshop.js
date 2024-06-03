"use strict";
const mysql = require("promise-mysql");
const config = require("./../config/db/eshop.json");

async function getKategori() {
    const db = await mysql.createConnection(config);
    let sql = `call get_kategori();`;

    let res = await db.query(sql);

    return res[0];
}

async function allProdukt() {
    const db = await mysql.createConnection(config);
    let sql = `select 
                    produktid, 
                    namn, 
                    pris, 
                    antal, 
                    group_concat(kategori) as kategori 
                from v_produkt 
                    group by produktid;`;

    let res = await db.query(sql);

    console.log(res);
    return res;
}

async function insertProdukt(data) {
    const db = await mysql.createConnection(config);
    let sql = `call insert_produkt(?, ?, ?, ?, ?);`;

    await db.query(sql, [data.produktid,
        parseInt(data.pris), data.namn, data.bildlank, data.beskrivning]);
    console.log(data);
}

async function getOne(id) {
    const db = await mysql.createConnection(config);
    let sql = `select * from produkt where produktid = ?`;

    let res = await db.query(sql, [id]);

    return res[0];
}

async function updateEshop(data) {
    const db = await mysql.createConnection(config);
    let sql = `update produkt 
                    set 
                        pris = ?, 
                        namn = ?, 
                        bildlank = ?, 
                        beskrivning = ? 
                    where produktid = ?;`;

    await db.query(sql, [parseInt(data.pris),
        data.namn, data.bildlank, data.beskrivning, data.produktid]);
    console.log(data);
}

async function deleteProdukt(data) {
    const db = await mysql.createConnection(config);
    let sql = `delete from produkt where produktid = ?;`;

    await db.query(sql, [data.produktid]);
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
    about                                   Show grop members
    logg <number>                           Show the <number> last loggs
    product                                 Show products
    shelf                                   Show all shelfs
    inv                                     Show inventory
    inv <str>                               Search in inventory
    invadd <productid> <shelf> <number>     Add number of product on shelf
    invdel <productid> <shelf> <number>     Removes product from shelf
    `);
}

async function showLogg(rows) {
    const db = await mysql.createConnection(config);
    let sql = `select * from logg limit ?;`;

    let res = await db.query(sql, [parseInt(rows)]);

    return res;
}

async function showProdukt() {
    const db = await mysql.createConnection(config);
    let sql = `select * from produkt;`;

    let res = await db.query(sql);

    return res;
}

async function showShelf() {
    const db = await mysql.createConnection(config);
    let sql = `select * from lager;`;

    let res = await db.query(sql);

    return res;
}

async function showInv(str) {
    const db = await mysql.createConnection(config);
    let sql;
    let res;

    if (str == null) {
        sql = `select produktid, namn, hylla, antal from v_produkt;`;
        res = await db.query(sql);
    } else {
        sql = `select 
                    produktid, 
                    namn, 
                    hylla, 
                    antal 
                from 
                    v_produkt 
                where 
                    produktid like ? 
                    or namn like ? 
                    or hylla like ?;`;
        res = await db.query(sql, ["%".concat(str, "%"),
            "%".concat(str, "%"), "%".concat(str, "%")]);
    }

    return res;
}

async function invAdd(id, hylla, antal) {
    const db = await mysql.createConnection(config);

    let sqlExist = `select 
                        count(*) as nr_of_produkts 
                    from 
                        produkt2lager 
                    where 
                        produktid = ? 
                        and hylla = ?;`;
    let nrOfProdukts = await db.query(sqlExist, [id, hylla]);

    if (nrOfProdukts[0].nr_of_produkts == 0) {
        let sqlInsert = `insert into produkt2lager (produktid, hylla, antal) values (?, ?, ?);`;

        await db.query(sqlInsert, [id, hylla, parseInt(antal)]);
    } else {
        let sqlSelect = `select antal from produkt2lager where produktid = ? and hylla = ?;`;
        let oldAntal = await db.query(sqlSelect, [id, hylla]);
        let newAntal = parseInt(oldAntal[0].antal) + parseInt(antal);

        let sqlUpdate = `update produkt2lager set antal = ? where produktid = ? and hylla = ?;`;

        await db.query(sqlUpdate, [newAntal, id, hylla]);
    }
    let sql = `select * from produkt2lager`;
    let res = await db.query(sql);

    return res;
}

async function invDel(id, hylla, antal) {
    const db = await mysql.createConnection(config);

    let sqlExist = `select 
                        count(*) as nr_of_produkts 
                    from 
                        produkt2lager 
                    where 
                        produktid = ? 
                        and hylla = ?;`;
    let nrOfProdukts = await db.query(sqlExist, [id, hylla]);

    if (nrOfProdukts[0].nr_of_produkts != 0) {
        let sqlSelect = `select antal from produkt2lager where produktid = ? and hylla = ?;`;
        let oldAntal = await db.query(sqlSelect, [id, hylla]);
        let newAntal = parseInt(oldAntal[0].antal) - parseInt(antal);

        let sqlUpdate = `update produkt2lager set antal = ? where produktid = ? and hylla = ?;`;

        await db.query(sqlUpdate, [newAntal, id, hylla]);
    }
    let sql = `select * from produkt2lager`;
    let res = await db.query(sql);

    return res;
}

module.exports = {
    "getKategori": getKategori,
    "allProdukt": allProdukt,
    "insertProdukt": insertProdukt,
    "getOne": getOne,
    "updateEshop": updateEshop,
    "deleteProdukt": deleteProdukt,
    "exitProgram": exitProgram,
    "showMenu": showMenu,
    "showLogg": showLogg,
    "showProdukt": showProdukt,
    "showShelf": showShelf,
    "showInv": showInv,
    "invAdd": invAdd,
    "invDel": invDel
};
