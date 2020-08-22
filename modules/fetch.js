//const request = require("request-promise");
const axios = require("axios");
const PRESIDENT_LIST_PAGE = "/wiki/List_of_presidents_of_the_United_States";
const WIKI_URL = "https://en.wikipedia.org";

/**
 * Fetches the USA president page on Wikipedia
 */
module.exports.getPresidents = async () => {
    return await axios.get(WIKI_URL + PRESIDENT_LIST_PAGE);
};

/**
 * Fetches the HTML content for a wikipage
 * @param presidentPath wiki path for a president
 */
module.exports.getPresident = async (PRESIDENT_PAGE) => {
    if (PRESIDENT_PAGE === undefined) throw "No president path given";
    return await axios.get(WIKI_URL + PRESIDENT_PAGE);
};
