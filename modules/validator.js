const validate = require("validate.js");
const { presidentConstraints, infoConstraints } = require("./constraints.js");

module.exports.validPresident = async (president) => {
    try {
        return await validate(president, presidentConstraints);
    } catch (error) {
        throw "Couldn't validate president";
    }
};

module.exports.validInfo = async (info) => {
    try {
        //console.log('\n', info, '\n')
        return await validate(info, infoConstraints);
    } catch (error) {
        throw "Couldn't validate info";
    }
};
