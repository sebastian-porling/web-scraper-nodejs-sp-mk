const jsonfile = require("jsonfile");
const FORMATING = { spaces: 4, EOL: '\r\n' };

/**
 * Writes a json file with the given input
 * @param JSON
 */
module.exports.writeJson = async (FILE_NAME, JSON) => {
    return await jsonfile.writeFile(FILE_NAME, JSON, FORMATING);
};
