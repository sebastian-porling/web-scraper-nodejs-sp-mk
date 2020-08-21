const { getPresident, getPresidents } = require("./fetch.js");
const { scrapePresident, scrapePresidents } = require("./webScraper.js");
const { writeJson } = require("./fileWriter.js");

/**
 * Fetches information of presidents from the USA
 * and writes it out into a json file.
 */
(async function main() {
    const output = [];
    try {
        const presidentsHTML = await getPresidents();
        const presidents = scrapePresidents(presidentsHTML);
        presidents.forEach(async (president, i, arr) => {
            const presidentHTML = await getPresident(president.link);
            const { born, died } = scrapePresident(presidentHTML);
            president = Object.assign(president, { born, died });
            output.push(president);
            if (i === arr.length - 1) writeJson("presidents.json", output);
        });
    } catch (err) {
        console.log(err);
    }
})();
