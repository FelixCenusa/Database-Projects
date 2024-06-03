"use strict";
//fs is file system
const fs = require("fs").promises;
const path = "./info.txt";

async function main() {
    console.log("1) I am first");


    let data = await fs.readFile(path, "utf-8");

    console.log(data);


    console.log("3) I am Last");
}

main();
