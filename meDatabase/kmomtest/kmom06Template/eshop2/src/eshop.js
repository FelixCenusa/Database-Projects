"use strict";
const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");

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
    order                                   Display all orders
    order <search>                          Display all orders with <search>
    plocklist <orderid>                     Creates a plocklist
    ship <orderid>                          Ship the order
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

async function showKundInfo() {
    const db = await mysql.createConnection(config);

    let sql = `select * from kund;`;

    let res = await db.query(sql);

    return res;
}

async function createOrder(kundid) {
    const db = await mysql.createConnection(config);

    console.log(kundid);

    let sql = `insert into order_ (kundid) values (?);`;

    await db.query(sql, [kundid]);
}

async function getOrder() {
    const db = await mysql.createConnection(config);

    let sql = `select * from v_order;`;
    let res = await db.query(sql);

    return res;
}

async function getProductToOrder(orderid) {
    const db = await mysql.createConnection(config);

    console.log(orderid);

    let sql = `select * from v_order2produkt where orderid = ?;`;

    let res = await db.query(sql, [orderid]);

    console.log(res);

    return res;
}

async function addProduktToOrder(orderid, produktid, antal) {
    const db = await mysql.createConnection(config);

    console.log(antal.antal);
    let sqlAntal = `select produkter from order_ where orderid = ?;`;
    let oldAntal = await db.query(sqlAntal, [parseInt(orderid)]);

    console.log(oldAntal);
    let newAntal = oldAntal[0].produkter + parseInt(antal.antal);

    console.log(newAntal);
    let sqlUpdateAntal = `update order_ set produkter = ? where orderid = ?;`;

    await db.query(sqlUpdateAntal, [newAntal, parseInt(orderid)]);

    let sqlNrOfProdukt = `select antal from order2produkt where orderid = ? and produktid = ?;`;
    let nrOfProdukt = await db.query(sqlNrOfProdukt, [parseInt(orderid), produktid]);
    let sqlUpdate;

    console.log(nrOfProdukt[0]);

    if (nrOfProdukt[0] == null || nrOfProdukt[0] == 0) {
        console.log("hej");
        sqlUpdate = `insert into order2produkt(antal, orderid, produktid) values (?, ?, ?);`;
        await db.query(sqlUpdate, [parseInt(antal.antal), parseInt(orderid), produktid]);
    } else {
        let sqlAntal2 = `select antal from order2produkt where orderid = ? and produktid = ?;`;
        let oldAntal2 = await db.query(sqlAntal2, [orderid, produktid]);
        let newAntal2 = oldAntal2[0].antal + parseInt(antal.antal);

        sqlUpdate = `update order2produkt set antal = ? where orderid = ? and produktid = ?;`;
        console.log(newAntal);
        await db.query(sqlUpdate, [newAntal2, parseInt(orderid), produktid]);
    }
}

async function orderOrder(orderid) {
    const db = await mysql.createConnection(config);

    let sql = `update order_ set ordered = current_timestamp where orderid = ?;`;

    await db.query(sql, [orderid]);
}

async function showOrder(str) {
    const db = await mysql.createConnection(config);
    let sql;
    let res;

    if (str == null) {
        sql = `select * from v_order;`;
        res = await db.query(sql);
    } else {
        sql = `select 
                    * 
                from 
                    v_order 
                where 
                    orderid like ? 
                    or kundid like ?;`;
        res = await db.query(sql, [str, str]);
    }

    return res;
}

async function getPlocklist(orderid) {
    const db = await mysql.createConnection(config);

    let sql = `select * from v_plocklist where orderid = ?;`;

    let res = await db.query(sql, [orderid]);

    return res;
}

async function shipOrder(orderid) {
    const db = await mysql.createConnection(config);

    let sql = `update order_ set skickad = current_timestamp where orderid = ?;`;

    await db.query(sql, [orderid]);
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
    "invDel": invDel,
    "showKundInfo": showKundInfo,
    "createOrder": createOrder,
    "getOrder": getOrder,
    "getProductToOrder": getProductToOrder,
    "addProduktToOrder": addProduktToOrder,
    "orderOrder": orderOrder,
    "showOrder": showOrder,
    "getPlocklist": getPlocklist,
    "shipOrder": shipOrder
};
