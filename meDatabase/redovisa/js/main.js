/**
 * A function to wrap it all in.
 */
(function () {
    "use strict";
    let greeting = "It should be before 10am ";
    let greetingElement = document.getElementById("greeting");
    const now = new Date();

    if (now.getHours() >= 10) {
        greeting = "Its like " + now.getHours() + "or like 10am ";
    } else if (now.getHours() >= 17) {
        greeting = "Its about " + now.getHours() + " am or pm";
    }
    greetingElement.textContent = greeting;
    console.log (greeting, now, "\n", greetingElement);
    //const greeting = "Saaaaallaaaaamm allleeekum Habiiibiiii"
    const elements = ["HiThere", "FelixAsh", new Date(), 420, 69];

    for (let index = 0; index < elements.length; index++) {
        console.log (elements[index]);
    }
    elements.forEach ((element, index) => console.log(element, index));
})();

