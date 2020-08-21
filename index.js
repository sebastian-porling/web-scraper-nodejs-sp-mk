const ora = require("ora");
const { getPresident, getPresidents } = require("./modules/fetch.js");
const {
    scrapePresident,
    scrapePresidents,
} = require("./modules/webScraper.js");
const { writeJson } = require("./modules/fileWriter.js");

/**
 * Fetches information of presidents from the USA
 * and writes it out into a json file.
 */
module.exports.main = async () => {
    const output = [];
    const throbber = ora();
    try {
        throbber.start(
            "Feching presidents from /wiki/List_of_presidents_of_the_United_States"
        );
        const response = await getPresidents();
        const presidents = await scrapePresidents(response.data);
        throbber
            .succeed(" All done fetching presidents!\n")
            .start("Fetching information from each president...");
        presidents.forEach(async (president, i, arr) => {
            const response = await getPresident(president.link);
            const { born, died } = await scrapePresident(response.data);
            output.push(Object.assign(president, { born, died }));
            if (i === arr.length - 1) {
                throbber
                    .succeed(" All president information is fetched!\n")
                    .start("Writing to presidents.json...");
                await writeJson("presidents.json", output);
                throbber.succeed(" Done writing, check presidents.json!");
            }
        });
    } catch (err) {
        throbber.fail("We recieved error while fetching or writing json file!");
    }
};
