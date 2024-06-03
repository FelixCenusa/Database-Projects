// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};

"use strict";

const readline = require("readline-promise").default;
const bankjs = require("./src/bank.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exitProgram = (exit = 0) => {
    console.log("Exiting program.");
    process.exit(exit);
};

function showMenu() {
    console.log("Here is the terminal version of the web client.");
    console.log("What would you like to do?");
    console.log("\"balance\": Show all accounts");
    console.log("\"move\": Move 1.5 from Eva to Adam");
    console.log("\"move <amount> <from> <to>\": Will move the amount from one account to another");
    console.log("\"menu or help\": See this menu again");
    console.log("\"exit or quit\": Stop the program");
}


async function main() {
    let res;

    showMenu();
    rl.setPrompt("Enter input: ");
    rl.prompt();
    rl.on("close", exitProgram);
    rl.on("line", async function(input) {
        input = input.trim().toLowerCase();
        let parts = input.split(" ");

        switch (parts[0]) {
            case "quit":
            case "exit":
                exitProgram();
                break;
            case "menu":
            case "help":
                showMenu();
                break;
            case "balance":
                res = await bankjs.showAll();

                console.table(res);
                break;
            case "move":
                if (parts.length === 4) {
                    await bankjs.move(parts[1], parts[2], parts[3]);
                } else {
                    await bankjs.move(1.5, 1111, 2222);
                }
                console.log("Money moved.");

                break;
            default:
                showMenu();
                break;
        }
        rl.prompt();
    });
}

main();
