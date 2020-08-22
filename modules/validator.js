const validate = require("validate.js");
const { presidentConstraints, infoConstraints } = require("./constraints.js");

/**
 * Checks if the president object is valid
 * @param president president object
 * @returns undefined if no errors
 * @throws error if something wrong with the validator
 */
module.exports.validPresident = async (president) => {
    try {
        return await validate(president, presidentConstraints);
    } catch (error) {
        throw "Couldn't validate president";
    }
};

/**
 * Validates the strucutre of the info object
 * @param info info object
 * @returns undefined if no erros
 * @throws error if something wrong with the validator
 */
module.exports.validInfo = async (info) => {
    try {
        return await validate(info, infoConstraints);
    } catch (error) {
        throw "Couldn't validate info";
    }
};
