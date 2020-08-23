const figlet = require("figlet");

/**
 * Displays a heart warming welcome message
 * in standard out. If the figlet couln't be
 * generated we will display a simple message instead.
 */
module.exports.showWelcomeMessage = async () => {
    try {
        console.log(figlet.textSync("'MURICA"));
        console.log(figlet.textSync("F*** YEAH!"));
    } catch (error) {
        console.log("'MURICA");
        console.log("F*** YEAH! 🔫 \n");
    }
};
