const ora = require("ora");
const chalk = require("chalk");
const {
    getPresident,
    getPresidents,
    PRESIDENT_LIST_PAGE,
} = require("./modules/fetch.js");
const {
    scrapePresident,
    scrapePresidents,
} = require("./modules/webScraper.js");
const { writeJson } = require("./modules/fileWriter.js");
const {
    validPresident,
    validInfo,
    getErrors,
} = require("./modules/validator.js");
const timer = require("./modules/timer.js");
const { showWelcomeMessage } = require("./modules/welcomeMessage.js");
const throbber = ora({ spinner: "arc" });

/**
 * Fetches information of presidents from the USA
 * and writes it out into a json file.
 */
module.exports.main = async () => {
    try {
        timer.start();
        await showWelcomeMessage();
        throbber.start(
            `Feching presidents from ${chalk.blue(PRESIDENT_LIST_PAGE)}\n`
        );
        const response = await getPresidents();
        const presidents = await scrapePresidents(response.data);
        throbber
            .succeed(`Done fetching ${chalk.blue(PRESIDENT_LIST_PAGE)}!\n`)
            .start("Fetching each presidents information!\n");
        const output = await addPresidentInfromation(presidents);
        throbber
            .succeed("All president information is fetched!\n")
            .start("Writing to presidents.json...\n");
        output.sort((first, second) => first.number - second.number);
        await writeJson("presidents.json", output);
        throbber.succeed(
            `Done writing, check ${chalk.blue("presidents.json")}!` +
                `\n  Took a total of ${chalk.green(timer.stop())}`
        );
    } catch (error) {
        throbber.fail(error);
    }
};

/**
 * Adds information about each president.
 * @param presidents list of presidents
 * @throws errors if validation, fetch or scraping would be foulty
 */
const addPresidentInfromation = async (presidents = []) => {
    if (presidents.length === 0) throw "The array of presidents is empty";
    const result = [];
    await Promise.all(
        presidents.map(async (president) => {
            if ((valid = await validPresident(president)) !== undefined)
                throw `Not valid format: ${await getErrors(valid)}`;
            const response = await getPresident(president.link);
            throbber
                .stopAndPersist({
                    symbol: `${chalk.green("✔")}`,
                    text: `Fetched ${chalk.blue(president.link)}\n`,
                })
                .start("Fetching each presidents information!\n");
            const presidentInfo = await scrapePresident(response.data);
            if ((valid = await validInfo(presidentInfo)) !== undefined)
                throw `Not valid format: ${await getErrors(valid)}`;
            result.push(await Object.assign(president, presidentInfo));
        })
    );
    return result;
};
