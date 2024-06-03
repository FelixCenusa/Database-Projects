
const express = require("express");
const router = express.Router();
const eshop = require("./../src/eshop.js");

router.get("/", (req, res) => {
    console.log("index");
    let data = {};

    res.render("eshop/index.ejs", data);
});

router.get("/index", (req, res) => {
    console.log("index");
    let data = {};

    res.render("eshop/index.ejs", data);
});

router.get("/about", (req, res) => {
    console.log("About");
    let data = {};

    res.render("eshop/about.ejs", data);
});

router.get("/category", async (req, res) => {
    console.log("Category");
    let data = {};

    data.get_kategoris = await eshop.getKategori();
    console.log(data.get_kategoris);
    res.render("eshop/category.ejs", data);
});

router.get("/product", async (req, res) => {
    console.log("Product");
    let data = {};

    data.all_produkt = await eshop.allProdukt();
    console.log(data.all_produkt);
    res.render("eshop/product.ejs", data);
});

router.get("/add_produkt", (req, res) => {
    console.log("Add Produkt");
    let data = {};

    res.render("eshop/add_product.ejs", data);
});

router.post("/add_produkt", async (req, res) => {
    console.log(req.body);
    await eshop.insertProdukt(req.body);
    res.redirect("product");
});

router.get("/update/:produktid", async (req, res) => {
    console.log("Update");
    console.log(req.params.produktid);
    let data = {};

    data.one = await eshop.getOne(req.params.produktid);
    res.render("eshop/update.ejs", data);
});

router.post("/update", async (req, res) => {
    console.log(req.body);
    await eshop.updateEshop(req.body);
    res.redirect("product");
});

router.get("/delete/:produktid", async (req, res) => {
    console.log("Delete");
    let data = {};

    data.one = await eshop.getOne(req.params.produktid);
    res.render("eshop/delete.ejs", data);
});

router.post("/delete", async (req, res) => {
    await eshop.deleteProdukt(req.body);
    res.redirect("product");
});

module.exports = router;
