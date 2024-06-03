const express = require("express");
const router = express.Router();
const bank = require("./../src/bank.js");

router.get("/", (req, res) => {
    //console.log("Root Route HERE")
    let data = {};

    data.title = "Index page";
    res.render("pages/index.ejs", data);
});

router.get("/today", (req, res) => {
    //console.log("Root Route HERE")
    let data = {};

    data.today = new Date().toLocaleDateString();
    data.title = "Today's Date";
    res.render("pages/today.ejs", data);
});

router.get("/bank", async (req, res) => {
    //console.log("Root Route HERE")
    let data = {};

    data.theBank = await bank.showAll();
    data.title = "The Bank";
    console.log(data.theBank);
    res.render("pages/bank.ejs", data);
});

router.get("/bank/move-to-adam", async (req, res) => {
    //console.log("Root Route HERE")
    let data = {};
    //data.moveToAdam = await bank.moveToAdam();


    data.moveToAdam = await bank.move(1.5, 2222, 1111);//move(amount, from, to)
    data.showAll = await bank.showAll();
    data.title = "Move to Adam";
    console.log(data.moveToAdam);
    res.render("pages/bank/move-to-adam.ejs", data);
});

router.get("/bank/index", async (req, res) => {
    //console.log("Root Route HERE")
    let data = {};
    //data.moveToAdam = await bank.moveToAdam();
    //data.moveToAdam = await bank.move(1.5, 2222, 1111);//move(amount, from, to)

    data.showAll = await bank.showAll();
    data.title = "Move to Adam";
    console.log(data.moveToAdam);
    res.render("pages/bank/index.ejs", data);
});

router.get("/bank/balance", async (req, res) => {
    //console.log("Root Route HERE")
    let data = {};
    //data.moveToAdam = await bank.moveToAdam();
    //data.moveToAdam = await bank.move(1.5, 2222, 1111);//move(amount, from, to)

    data.showAll = await bank.showAll();
    data.title = "Move to Adam";
    console.log(data.moveToAdam);
    res.render("pages/bank/balance.ejs", data);
});

router.get("/about", (req, res) => {
    //console.log("About Route HERE")
    let data = {};

    data.title = "About page";
    res.render("pages/about.ejs", data);
});



module.exports = router;
