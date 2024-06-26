const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    //console.log(req.headers);
    const token = req.body.token || req.query.token || req.headers["x-access-token"];// || req.cookies.access_token || req.session.token;

    if (!token) {
        return res.status(403).json({ error: "Unauthorized! A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized! Invalid Token"});
    }
    return next();
};

module.exports = verifyToken;