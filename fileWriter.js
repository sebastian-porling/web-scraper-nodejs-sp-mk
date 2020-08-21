const jsonfile = require("jsonfile");

/**
 * Writes a json file with the given input
 * @param {*} JSON
 */
module.exports.writeJson = (FILE_NAME, JSON) => {
    jsonfile
        .writeFile(FILE_NAME, JSON)
        .then((res) => {
            console.log("Successfully written the json file!");
        })
        .catch((error) =>
            console.error("Error when writing JSON file: ", error)
        );
};
