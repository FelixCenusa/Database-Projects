let coffee = {
    roast: "",
    pour: function() {
        console.log(`Pouring some ${this.roast}!`);
    },
    init: function(roast) {
        this.roast = roast;
    }
};


function coffee2(roast) {
    this.roast = roast;
    this.pour = function () {
        console.log(`Pouring some ${this.roast}!`);
    };
}


module.exports = {
    "coffee1": coffee,
    "coffee2": coffee2
};
