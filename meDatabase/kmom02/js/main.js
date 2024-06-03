"use strict";

const cake = require("./cake.js");
const coffee = require("./coffee.js").coffee2;

let princessCake = new cake("Princess cake");
let semla = new cake("Semla");

let zoegas = new coffee("Dark Roast");

zoegas.pour();

princessCake.serve();
semla.serve();
