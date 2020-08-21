const ora = require("ora");
const { getPresident, getPresidents } = require("./modules/fetch.js");
const {
    scrapePresident,
    scrapePresidents,
} = require("./modules/webScraper.js");
const { writeJson } = require("./modules/fileWriter.js");
const throbber = ora();
const output = [];

/**
 * Fetches information of presidents from the USA
 * and writes it out into a json file.
 */
module.exports.main = async () => {
    try {
        throbber.start(
            "Feching presidents from /wiki/List_of_presidents_of_the_United_States\n"
        );
        const response = await getPresidents();
        const presidents = await scrapePresidents(response.data);
        throbber.succeed("Done fetching president list!\n")
                .start("Fetching each presidents information!\n")
        await addPresidentInfromation(presidents);
        throbber.succeed("All president information is fetched!\n")
                .start("Writing to presidents.json...\n");
        await writeJson("presidents.json", output);
        throbber.succeed("Done writing, check presidents.json!");
    } catch (err) {
        throbber.fail("We recieved error while fetching or writing json file!");
    }
};

const addPresidentInfromation = async (presidents) => {
    await presidents.reduce(async (promise, president) => {
        const response = await getPresident(president.link);
        throbber.start("Fetced " + president.link + "\n")
        const { born, died } = await scrapePresident(response.data);
        output.push(await Object.assign(president, { born, died }));
    }, Promise.resolve());
}