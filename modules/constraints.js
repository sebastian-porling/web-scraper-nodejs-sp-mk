module.exports.presidentConstraints = {
    number: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
        },
    },
    name: {
        presence: true,
        type: "string",
    },
    img: {
        presence: true,
        type: "string",
    },
    link: {
        presence: true,
        type: "string",
    },
    party: {
        presence: true,
        type: "string",
    },
};

module.exports.infoConstraints = {
    born: {
        presence: true,
        format: /\d{4}-\d{2}-\d{2}/,
    },
    died: {
        format: /\d{4}-\d{2}-\d{2}/,
    },
    signature: {
        presence: true,
        type: "string",
    },
};
