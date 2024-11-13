const mongoose = require("mongoose");
const Video = require("./Video");

// List
const ListSchema = mongoose.Schema(
    {
       listname: { type: String },
       videos: [{ type: mongoose.Schema.Types.ObjectId, ref: Video }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);