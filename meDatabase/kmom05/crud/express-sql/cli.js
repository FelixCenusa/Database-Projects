
"use strict";

const bank = require("./src/bank.js");
const functions = require("./src/bank.js");
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
                bank.exitProgram(0);
                break;
            case "menu":
            case "help":
                bank.showMenu();
                break;
            case "move":
                await bank.moveToAdam("1111", "2222");
                break;
            case "balance":
                res = await bank.showAll();
                console.table(res);
                break;
            default:
                functions.showMenu();
                break;
        }

        rl.prompt();
    });
})();
