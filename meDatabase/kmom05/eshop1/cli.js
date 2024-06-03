
"use strict";

const eshop = require("./src/eshop.js");
const readline = require("readline-promise").default;

// Read from commandline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify rl.question to question
const util = require("util");

rl.question[util.promisify.custom] = (arg) => {
    return new Promise((resolve) => {
        rl.question(arg, resolve);
    });
};




/**
 * Main function.
 * @async
 * @returns void
 */
(async function main() {
    let res;

    rl.setPrompt("Enter input: ");
    rl.prompt();

    rl.on("line", async function(input) {
        input = input.trim();
        let parts = input.split(" ");

        switch (parts[0]) {
            case "quit":
            case "exit":
                eshop.exitProgram(0);
                break;
            case "menu":
            case "help":
                eshop.showMenu();
                break;
            case "about":
                console.log("Grupmedlemar:\nMathilda Rönnqvist, marq23");
                console.log("Grupmedlemar:\nFelix Cenusa, fece23");
                break;
            case "logg":
                res = await eshop.showLogg(parts[1]);
                console.table(res);
                break;
            case "product":
                res = await eshop.showProdukt();
                console.table(res);
                break;
            case "shelf":
                res = await eshop.showShelf();
                console.table(res);
                break;
            case "inv":
                res = await eshop.showInv(parts[1]);
                console.table(res);
                break;
            case "invadd":
                res = await eshop.invAdd(parts[1], parts[2], parts[3]);
                console.table(res);
                break;
            case "invdel":
                res = await eshop.invDel(parts[1], parts[2], parts[3]);
                console.table(res);
                break;
            default:
                eshop.showMenu();
                break;
        }

        rl.prompt();
    });
})();
