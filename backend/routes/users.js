const router = require("express").Router();
const returnMessage = require("../functions/returnMessage");
const verifyToken = require("../functions/verifyToken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const List = require("../models/List");
const CryptoJS = require("crypto-js");

// Get User
router.get("/find/:userid", async (req, res) => {
    try {
        const user = await User.findById(req.params.userid);
        const { password, ...info } = user._doc;
        returnMessage(res, 200, info);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});

// Update User
router.put("/changePassword", async (req, res) => {
    try {
        const currentUser = await User.findOne({ email: req.body.email });
        if (currentUser.secanswer === req.body.secanswer) {
            const updatedUser = await User.findByIdAndUpdate(currentUser._id, 
                { password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() }, { new: true });
            returnMessage(res, 200, updatedUser);    
        } else {
            returnMessage(res, 403, "You are not allowed!")
        }
    } catch (err) {
        returnMessage(res, 500, err);
    }
});

// Delete User
router.delete("/:userid", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.userid);
            returnMessage(res, 200, "User has been deleted");
        } catch (err) {
            returnMessage(res, 500, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed to delete another account");
    }
});

// Get Total User
router.get("/statistic", async (req, res) => {
    try {
        const data = await User.aggregate([
            { $match: { "isAdmin": false } },
            { $count: "totalUsers" }
        ]);
        returnMessage(res, 200, data);
    } catch (err) {
        returnMessage(res, 404, err);
    }
});


// Add Profile
router.post("/:userid/profiles", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        const newProfile = new Profile({
            profilename: req.body.profilename
        });
        try {
            const user = await User.findById(req.params.userid);
            const profile = await newProfile.save();
            user.profiles.push(profile);
            await user.save();
            returnMessage(res, 201, profile);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get Profile
router.get("/find/:userid/profiles/find/:profileid", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        try {
            const profile = await Profile.findById(req.params.profileid);
            returnMessage(res, 200, profile);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get Profiles
router.get("/:userid/profiles", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        try {
            const user = await User.findById(req.params.userid);
            const { profiles, ...info } = user._doc;
            returnMessage(res, 200, profiles);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Select Profile
router.put("/:userid/profiles", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userid,
                { selectedprofile: req.body.selectedprofile }, { new: true });
            returnMessage(res, 200, user);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 404, "Something went wrong")
    }
});

// Delete Profile
router.delete("/:userid/profiles/:profileid", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        try {
            await User.updateOne({ _id: req.params.userid }, 
                { $pull: { profiles: req.params.profileid } });
            await Profile.findByIdAndDelete(req.params.profileid);
            returnMessage(res, 200, "Profile has been deleted")
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "Something went wrong");
    }
});

// Add List
router.post("/:userid/profiles/:profileid/lists", verifyToken, async (req, res) => {
    const user = await User.findById(req.params.userid).select("selectedprofile");
    const { selectedprofile, ...info } = user._doc;
    if(selectedprofile === req.params.profileid) {
        const newList = List({
                listname: req.body.listname
            });
        try {
            const profile = await Profile.findById(req.params.profileid);
            const list = await newList.save();
            profile.lists.push(list);
            await profile.save();
            returnMessage(res, 201, list);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get List
router.get("/find/:userid/profiles/find/:profileid/lists/find/:listid", verifyToken, async (req, res) => {
    const user = await User.findById(req.params.userid).select("selectedprofile");
    const { selectedprofile, ...info } = user._doc;
    if(selectedprofile === req.params.profileid) {
        try {
            const list = await List.findById(req.params.listid);
            returnMessage(res, 200, list);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});

// Get Lists
router.get("/:userid/profiles/:profileid/lists", verifyToken, async (req, res) => {
    const user = await User.findById(req.params.userid).select("selectedprofile");
    const { selectedprofile, ...info } = user._doc;
    if(selectedprofile === req.params.profileid) {
        try {
            const profile = await Profile.findById(req.params.profileid);
            const { lists, ...info } = profile._doc;
            returnMessage(res, 200, lists);
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "You are not allowed");
    }
});


// Delete List
router.delete("/:userid/profiles/:profileid/lists/:listid", verifyToken, async (req, res) => {
    if (req.user.id === req.params.userid) {
        try {
            await Profile.updateOne({ _id: req.params.profileid }, 
                { $pull: { lists: req.params.listid } });
            await List.findByIdAndDelete(req.params.listid);
            returnMessage(res, 200, "List has been deleted")
        } catch (err) {
            returnMessage(res, 400, err);
        }
    } else {
        returnMessage(res, 403, "Something went wrong");
    }
});

module.exports = router;