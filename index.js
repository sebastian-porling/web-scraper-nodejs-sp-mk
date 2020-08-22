const ora = require("ora");
const { getPresident, getPresidents } = require("./modules/fetch.js");
const {
    scrapePresident,
    scrapePresidents,
} = require("./modules/webScraper.js");
const { writeJson } = require("./modules/fileWriter.js");
const throbber = ora();

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
        throbber
            .succeed("Done fetching president list!\n")
            .start("Fetching each presidents information!\n");
        const output = await addPresidentInfromation(presidents);
        throbber
            .succeed("All president information is fetched!\n")
            .start("Writing to presidents.json...\n");
        output.sort((first, second) => first.number - second.number);
        await writeJson("presidents.json", output);
        throbber.succeed("Done writing, check presidents.json!");
    } catch (err) {
        throbber.fail("We recieved error while fetching or writing json file!\n\t" + err);
    }
};

/**
 * Adds information about each president.
 * @param presidents
 */
const addPresidentInfromation = async (presidents = []) => {
    if ( presidents.length === 0 ) throw "The array of presidents is empyty";
    const result = [];
    await presidents.reduce(async (promise, president) => {
        const response = await getPresident(president.link);
        throbber.start("Fetched " + president.link + "\n");
        const presidentInfo = await scrapePresident(response.data);
        result.push(await Object.assign(president, presidentInfo));
        await promise;
    }, Promise.resolve());
    return result;
};
