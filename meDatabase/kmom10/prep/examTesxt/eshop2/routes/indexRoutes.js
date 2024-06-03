
const express = require("express");
const router = express.Router();
const examtest = require("../src/examtest.js");

router.get("/examtest", (req, res) => {
    console.log("index");
    let data = {};

    data.title = "Index";

    res.render("examtest/index.ejs", data);
});

router.get("/examtest/index", (req, res) => {
    console.log("index");
    let data = {};

    data.title = "Index";

    res.render("examtest/index.ejs", data);
});

router.get("/examtest/visa", async (req, res) => { //deletedis
    console.log("exam visa");
    let data = {};

    data.title = "Visa";
    data.showAll = await examtest.showAll();
    //console.log(data.showAll);

    res.render("examtest/visa.ejs", data);
});

router.get("/examtest/search", async (req, res) => { //deletedis
    console.log("exam visa");
    let data = {};

    data.title = "Visa";
    data.info = await examtest.showAll();
    //data.searchAll = await examtest.searchAllWeb(what);
    //console.log(data.showAll);

    res.render("examtest/search.ejs", data);
});

router.post("/examtest/search", async (req, res) => { //deletedis
    console.log("exam visa");
    let data = {};

    data.title = "Visa";

    data.info = await examtest.searchAllWeb(req.body.what);

    res.render("examtest/search.ejs", data);
});


module.exports = router;
