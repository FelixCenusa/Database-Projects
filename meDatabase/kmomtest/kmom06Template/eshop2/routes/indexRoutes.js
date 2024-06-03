
const express = require("express");
const router = express.Router();
const eshop = require("../src/eshop.js");

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

router.get("/customer", async (req, res) => {
    console.log("Customer");
    let data = {};

    data.kundinfo = await eshop.showKundInfo();
    console.log(data.kundinfo);
    res.render("eshop/customer.ejs", data);
});

router.get("/order", async (req, res) => {
    console.log("Order");
    let data = {};

    data.all_order = await eshop.getOrder();
    console.log(data.all_order);
    res.render("eshop/order.ejs", data);
});

router.get("/add_order/:kundid", async (req, res) => {
    console.log("Add Order");

    await eshop.createOrder(req.params.kundid);

    console.log("Add Order");

    res.redirect("../order");
});

router.get("/view_order/:orderid", async (req, res) => {
    console.log("View order");
    let data = {};

    data.produktinfo = await eshop.getProductToOrder(req.params.orderid);
    data.orderid = req.params.orderid;
    res.render("eshop/view_order.ejs", data);
});

router.get("/add_to_order/:orderid", async (req, res) => {
    console.log("Add to order");
    let data = {};

    data.produktinfo = await eshop.allProdukt();
    data.orderid = req.params.orderid;
    res.render("eshop/add_to_order.ejs", data);
});

router.post("/add_to_order_part2/:orderid/:produktid", async (req, res) => {
    console.log("Add to order");
    let data = {};

    data.produktinfo = await eshop.addProduktToOrder(req.params.orderid,
        req.params.produktid, req.body);
    data.orderid = req.params.orderid;
    res.redirect("../../../add_to_order/"+ data.orderid);
});

router.get("/send_order/:orderid", async (req, res) => {
    console.log("Send Order");

    await eshop.orderOrder(req.params.orderid);

    res.redirect("../order");
});


module.exports = router;
