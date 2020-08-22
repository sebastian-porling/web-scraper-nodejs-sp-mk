const jsonfile = require("jsonfile");
const FORMATING = { spaces: 4, EOL: "\r\n" };

/**
 * Writes a json file with the given input
 * @param JSON To write
 */
module.exports.writeJson = async (FILE_NAME = "result.json", JSON) => {
    try {
        return await jsonfile.writeFile(FILE_NAME, JSON, FORMATING);
    } catch (error) {
        throw "Couldn't write the " + FILE_NAME;
    }
};
