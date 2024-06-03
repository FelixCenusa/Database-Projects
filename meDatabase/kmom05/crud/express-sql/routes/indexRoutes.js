
const express = require("express");
const router = express.Router();
const bank = require("./../src/bank.js");

router.get("/index", (req, res) => {
    console.log("index");
    let data = {};

    data.today = new Date().toLocaleDateString();
    data.arr = [1, "tow", 3, "four"];
    res.render("bank/index.ejs", data);
});

router.get("/balance", async (req, res) => {
    let data = {};

    data.allAccounts = await bank.showAll();
    console.log(data.allAccounts);
    res.render("bank/balance.ejs", data);
});


router.get("/move-to-adam", (req, res) => {
    bank.moveToAdam("2222", "1111");
    console.log("move-to-adam");
    res.render("bank/move-to-adam.ejs");
});

router.get("/create", (req, res) => {
    console.log("Create");
    let data = {};

    res.render("bank/create.ejs", data);
});

router.post("/create", async (req, res) => {
    //console.log(req.body);

    await bank.insertBank(req.body);
    res.redirect("index");
});

router.get("/update/:id", async (req, res) => {
    console.log("Update");
    let data = {};

    data.one = await bank.getOne(req.params.id);

    res.render("bank/update.ejs", data);
});

router.post("/update", async (req, res) => {
    //console.log(req.body);

    await bank.updateBank(req.body);
    res.redirect("balance");
});

router.get("/delete/:id", async (req, res) => {
    console.log("Delete");
    let data = {};

    data.one = await bank.getOne(req.params.id);

    res.render("bank/delete.ejs", data);
});

router.post("/delete", async (req, res) => {
    //console.log(req.body);

    await bank.deleteBank(req.body.id);
    res.redirect("balance");
});

module.exports = router;
