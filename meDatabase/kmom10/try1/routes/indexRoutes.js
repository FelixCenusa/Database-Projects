
const express = require("express");
const router = express.Router();
const exam = require("../src/exam.js");

router.get("/", (req, res) => {//real
    console.log("wtf");
    let data = {};

    data.title = "Index";

    res.render("exam/index.ejs", data);
});

router.get("/exam", (req, res) => {//real
    console.log("wtf2");
    let data = {};

    data.title = "Index";

    res.render("/exam/index.ejs", data);
});

router.get("/exam/index/", (req, res) => { //real
    console.log("wtf3");
    let data = {};

    data.title = "Index";

    res.render("exam/index.ejs", data);
});

router.get("/exam/visa", async (req, res) => { //real
    console.log("exam visa");
    let data = {};

    data.title = "Visa";
    data.showAll = await exam.showAll();
    console.log(data.showAll);

    res.render("exam/visa.ejs", data);
});

router.get("/exam/search", async (req, res) => { //deletedis
    console.log("exam visa");
    let data = {};

    data.title = "Search";
    data.info = await exam.showAll();
    //data.searchAll = await exam.searchAllWeb(what);
    //console.log(data.showAll);

    res.render("exam/search.ejs", data);
});

router.post("/exam/search", async (req, res) => { //deletedis
    console.log("exam visa");
    let data = {};

    data.title = "Search";

    data.info = await exam.searchAllWeb(req.body.what);

    res.render("exam/search.ejs", data);
});


module.exports = router;
