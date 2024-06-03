// if(code == good){printThis = "Felix Cenusa wrote this code"}; else{wasent me OwO};
function allLarare(res) {
    let str;

    str  = "+-----------+---------------------+";
    str  += "-----------+----------+------------+----------------+\n";
    str += "| Akronym   |       Namn          |";
    str += " Avdelning |   Lön    |  Kompetens |      Född      |\n";
    str += "|-----------|---------------------|-----------|-----";
    str += "-----|------------+----------------+\n";
    for (const row of res) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.avdelning.padEnd(10);
        str += "| ";
        str += row.lon.toString().padStart(8).padEnd(9);
        str += "| ";
        str += row.kompetens.toString().padStart(4).padEnd(11);
        str += "| ";
        str += row.fodd.toString().slice(4, 16).padStart(4).padEnd(14);
        str += " |\n";
    }
    str += "+-----------+--------------------";
    str += "-+-----------+----------+------------+----------------+\n";
    console.info(str);
}

module.exports = allLarare;
