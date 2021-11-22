const mongoose = require("mongoose");

function extendSchema(Schema, definition, options) {
    return new mongoose.Schema(
        Object.assign({}, Schema.obj, definition),
        Object.assign({}, Schema.options, options),
    );
}

const baseSchema = new mongoose.Schema(
    {},
    {
        timestamps: {
            currentTime: () => new Date(new Date().getTime() + 540 * 60 * 1000),
        },
    },
);

module.exports = {
    extendSchema,
    baseSchema,
};
