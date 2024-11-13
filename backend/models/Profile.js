const mongoose = require("mongoose");
const List = require("./List")

// Profile
const ProfileSchema = mongoose.Schema(
    {
        profilename: { type: String },
        lists: [{ type: mongoose.Schema.Types.ObjectId, ref: List}]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);