async function searchLarare(db, what) {
    let sql = `Select * from larare where fornamn like ?;`;
    let res = await db.query(sql, [`%${what}%`]);

    return res;
}

module.exports = searchLarare;
