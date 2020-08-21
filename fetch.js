const request = require("request-promise");
const presidentsPath = "/wiki/List_of_presidents_of_the_United_States";
const wikiURL = "https://en.wikipedia.org";

/**
 * Fetches the USA president page on Wikipedia
 */
module.exports.getPresidents = () => {
    return request(wikiURL + presidentsPath);
};

/**
 * Fetches the HTML content for a wikipage
 * @param presidentPath wiki path for a president
 */
module.exports.getPresident = (presidentPath) => {
    return request(wikiURL + presidentPath);
};
