const axios = require("axios");
const PRESIDENT_LIST_PAGE = "/wiki/List_of_presidents_of_the_United_States";
const WIKI_URL = "https://en.wikipedia.org";
module.exports.PRESIDENT_LIST_PAGE = PRESIDENT_LIST_PAGE;

/**
 * Fetches the USA president page on Wikipedia
 * @returns response
 * @throws error if fetch couldn't be done
 */
module.exports.getPresidents = async () => {
    try {
        return await axios.get(WIKI_URL + PRESIDENT_LIST_PAGE);
    } catch (error) {
        throw "Couln't fetch from " + WIKI_URL + PRESIDENT_LIST_PAGE;
    }
};

/**
 * Fetches the HTML content for a wikipage
 * @param presidentPath wiki path for a president
 * @returns response
 * @throws error if fetch couldn't be done
 */
module.exports.getPresident = async (PRESIDENT_PAGE) => {
    if (PRESIDENT_PAGE === undefined) throw "No president path given";
    try {
        return await axios.get(WIKI_URL + PRESIDENT_PAGE);
    } catch (error) {
        throw "Couldn't fetch from " + WIKI_URL + PRESIDENT_PAGE;
    }
};
