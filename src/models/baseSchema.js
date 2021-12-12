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

// baseSchema.pre("save", async function (next) {
//     const obj_base = this;
//     for (const [k, v] of Object.entries(obj_base)) {
//         if (k.includes("_date")) {
//             obj_base[k] = new Date(v);
//         }
//         if (k.includes("_id")) {
//             obj_base[k] = ObjectId(v);
//         }
//     }
//     next();
// });

module.exports = {
    extendSchema,
    baseSchema,
};
