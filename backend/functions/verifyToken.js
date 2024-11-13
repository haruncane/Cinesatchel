const jwt = require("jsonwebtoken");
const returnMessage = require("./returnMessage");

function verifyToken(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) returnMessage(res, 403, "Invalid Token");
            req.user = user;
            next();
        });
    } else {
        return returnMessage(res, 401, "Not Authenticated")
    }
}

module.exports = verifyToken;