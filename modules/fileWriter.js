const jsonfile = require("jsonfile");

/**
 * Writes a json file with the given input
 * @param JSON
 */
module.exports.writeJson = async (FILE_NAME, JSON) => {
    return await jsonfile.writeFile(FILE_NAME, JSON);
};
