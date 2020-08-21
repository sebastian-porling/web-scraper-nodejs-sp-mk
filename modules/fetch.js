//const request = require("request-promise");
const axios = require("axios");
const presidentsPath = "/wiki/List_of_presidents_of_the_United_States";
const wikiURL = "https://en.wikipedia.org";

/**
 * Fetches the USA president page on Wikipedia
 */
module.exports.getPresidents = async () => {
    return await axios.get(wikiURL + presidentsPath);
};

/**
 * Fetches the HTML content for a wikipage
 * @param presidentPath wiki path for a president
 */
module.exports.getPresident = async (presidentPath) => {
    return await axios.get(wikiURL + presidentPath);
};
