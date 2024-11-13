const mongoose = require("mongoose");
const Profile = require("./Profile");

// User
const UserSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        usersurname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        profiles: { 
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: Profile }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 4']
        },
        selectedprofile: { type: String, default: null },
        secanswer: { type: String, required: true }
    },
    { timestamps: true }
);

function arrayLimit(val) {
    return val.length <= 4;
}

module.exports = mongoose.model("User", UserSchema);