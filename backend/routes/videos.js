const router = require("express").Router();
const Video = require("../models/Video");
const verifyToken = require("../functions/verifyToken");
const returnMessage = require("../functions/returnMessage");

// Add Video
router.post("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const newVideo = new Video(req.body);
        try {
            const video = await newVideo.save();
            returnMessage(res, 201, video);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get Video
router.get("/find/:videoid", verifyToken, async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoid);
        if (video.ratings.length > 0) {
            await Video.aggregate([ { $match: { _id: video._id } }, { $unwind: '$ratings' },
            { $group: { _id: '$_id', avarageRate: { $avg: '$ratings.rate' } } } ])
                .then( res => video.puan = res[0].avarageRate.toFixed(1));
        }
        returnMessage(res, 200, video);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Update Video
router.put("/:videoid", verifyToken, async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.videoid, 
            { $set: req.body, }, { new: true });
        returnMessage(res, 200, video);
    } catch (err) {
        returnMessage(res, 400, err);
    }
});

// Delete Video
router.delete("/:videoid", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Video.findByIdAndDelete(req.params.videoid);
            returnMessage(res, 200, "Video has been deleted");
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get All Videos
router.get("/allvideos", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const videos = await Video.find();
        returnMessage(res, 200, videos);
      } catch (err) {
        returnMessage(res, 404, err);
      }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
  });

// Get Videos by Format or Category
router.get("/", verifyToken, async (req, res) => {
    const formatQuery = req.query.format;
    const categoryQuery = req.query.category;
    let videos = [];
    try {
        if (formatQuery) {
            if (categoryQuery) {
                await Video.aggregate([
                    { $match: { format: formatQuery, $expr: { $in: [categoryQuery, "$categories"] } } }
                ]).then(docs => {
                    videos = docs.map(doc => doc._id.toString());
                });
            } else {
                await Video.aggregate([
                    { $match: { format: formatQuery } }
                ]).then(docs => {
                    videos = docs.map(doc => doc._id.toString());
                });
            }
        } else {
            //videos = await Video.find({}, '_id');
            await Video.find({}, '_id').then(docs => {
                videos = docs.map(doc => doc._id.toString());
            });
        }
        returnMessage(res, 200, videos);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Get Top10
router.get("/popular", verifyToken, async (req, res) => {
    let videos = [];
    try {
        await Video.find().sort({ "playcount": -1 }).limit(6).then(docs => {
            videos = docs.map(doc => doc._id.toString());
        });
        returnMessage(res, 200, videos);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Get by Search
router.get("/search", verifyToken, async (req, res) => {
    const termQuery = req.query.term;
    let videos = [];
    try {
        await Video.find( {"videoname": { $regex: termQuery, $options: "i" } } ).then(docs => {
            videos = docs.map(doc => doc._id.toString());
        });
        //videos = await Video.find( {"videoname": { $regex: req.body.videoname, $options: "i" } } );
        returnMessage(res, 200, videos);
    } catch (err) {
        returnMessage(res, 404, err)
    }
});

// Get Total Movie
router.get("/moviesStats", verifyToken, async (req, res) => {
    try {
        const data = await Video.aggregate([
            { $match: { "format": "Movie" } },
            { $count: "totalMovies" }
        ]);
        returnMessage(res, 200, data);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Get Total Series
router.get("/seriesStats", verifyToken, async (req, res) => {
    try {
        const data = await Video.aggregate([
            { $match: { "format": "Series" } },
            { $count: "totalSeries" }
        ]);
        returnMessage(res, 200, data);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Get Similars
router.get("/find/:videoid/similars", verifyToken, async (req, res) => {
    let videos = [];
    let data;
    try {
        const video = await Video.findById(req.params.videoid);
        const { categories, ...info } = video._doc;
        for (let i = 0; i < video.categories.length; i++) {
            await Video.aggregate([
                { $match: { $expr: { $in: [categories[i], "$categories"] } } }, { $limit: 5 }
            ]).then(docs => { data = docs.map(doc => doc._id.toString()) })
        }
        for (let i = 0; i < data.length; i++) {
            if (video._id.toString() !== data[i]) {
                videos.push(data[i]);
            }
        }
        returnMessage(res, 200, videos);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Add Rating
router.put("/rate/:videoid", verifyToken, async (req, res) => {
    const profile = req.body.ratings[0].ratedby;
    try {
        let video = await Video.findById(req.params.videoid);
        let arr = [];
        if (video.ratings.length !== 0) {
            video = await Video.findByIdAndUpdate(req.params.videoid, 
                { $pull: { ratings: { ratedby: profile } } })
            const result = await Video.findByIdAndUpdate(
                req.params.videoid,
                { $push: { ratings: req.body.ratings[0] } },
                { new: true }
            );
            returnMessage(res, 200, result);
        } else {
            const result = await Video.findByIdAndUpdate(
                req.params.videoid,
                { $push: { ratings: req.body.ratings[0] } },
                { new: true }
            );
            returnMessage(res, 200, result);
        }
    } catch (err) {
        returnMessage(res, 400, err);
    }
});

module.exports = router;