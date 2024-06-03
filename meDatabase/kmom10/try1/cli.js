
"use strict";

const examtest = require("./src/exam.js");
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
            case "quit": //need
            case "exit":
                examtest.exitProgram(0);
                break;
            case "menu": //need
            case "help":
                examtest.showMenu();
                break;
            case "about":  //need
                console.log("Author:\nFelix Beniamin Cenusa, fece23@student.bth.se");
                console.log("btw, the search function does NOT search through deveoper",
                    "or country since insctructons say only to search through product",
                    " and type NOT developer.");
                break;
            case "visa":   //need
                res = await examtest.showAllButUrls();
                console.table(res);
                break;
            case "search": //need
                if (parts.length < 2) {
                    console.log("You need to enter a search word");
                    break;
                }

                res = await examtest.searchAllCli(parts[1]);
                console.table(res);
                break;
            case "report":
                examtest.report();
                break;
            default:
                examtest.showMenu();
                break;
        }

        rl.prompt();
    });
})();
