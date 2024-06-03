// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};

"use strict";

const readline = require("readline-promise").default;
const helpers = require("./src/helpers.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exitProgram = (exit = 0) => {
    console.log("Exiting program.");
    process.exit(exit);
};

function showMenu() {
    console.log("\t\tMenu");
    console.log("\t\texit, quit              Exits program");
    console.log("\t\tmenu, help              Show this menu");
    console.log("\t\tlarare                  Show all larare");
    console.log("\t\tsok <string>            Search for larare");
    console.log("\t\tkompetens               See the change in kopetens");
    console.log("\t\tlon                     See the change in Lön");
    console.log("\t\tnylon <akronym> <lon>   See the change in Lön");
}


async function main() {
    let res;

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
            case "larare":
                res = await helpers.showAllLarare();

                console.table(res);
                break;
            case "sok":
                res = await helpers.searchLarare(parts[1]);

                console.table(res);
                break;
            case "kompetens":
                res = await helpers.kompetensChange();

                console.table(res);
                break;
            case "lon":
                res = await helpers.lonChange();

                console.table(res);
                break;
            case "nylon":
                await helpers.nylon(parts[1], parts[2]);
                break;
            default:
                showMenu();
                break;
        }
        rl.prompt();
    });

    // let search = await rl.questionAsync("Search for larare: ")

    //console.log(search)
    // const db = await mysql.createConnection(config)
    // let result = await searchLarare(db, search)
    // console.table(result)

    // const db = await mysql.createConnection(config);
    // let searchFor = "Al"
    // let result = await searchLarare(db, searchFor)

    //let result = await searchLarare(rl, search)

    //let sql = "select * from larare"

    // let sql = `
    // Select *
    //     from larare;`
    // let res = await db.query(sql)

    // for (const row of result) {
    //     console.table(row.fornamn)
    // }

    //console.log(JSON.stringify(res, null, 4))

    //console.table(res)


    // rl.close()
    // db.end()
}

main();
