"use strict";

class Cake {
    constructor(name) {
        this.name = name;
    }

    serve() {
        console.log(`Serving ${this.name}.`);
    }
}

module.exports = Cake;
