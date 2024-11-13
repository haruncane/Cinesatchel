// Return Message
function returnMessage(res, status, content) {
    res.status(status).json(content);
}

module.exports = returnMessage;