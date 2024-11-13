const mongoose = require("mongoose");

// Video
const VideoSchema = new mongoose.Schema(
    {
        videoname: { type: String },
        format: { type: String },
        categories: { type: [String] },
        description: { type: String },
        cast: { type: String },
        director: { type: String },
        releasedate: { type: String },
        duration: { type: String },
        limits: { type: String },
        video: { type: String },
        seriesname: { type: String },
        chapternumber: { type: String },
        trailer: { type: String },
        thumbnail: { type: String },
        puan: { type: Number, default: 0 },
        playcount: { type: Number, default: 0 },
        ratings: [{ ratedby: { type: String }, rate: { type: Number, min: 1, max: 10 } }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
