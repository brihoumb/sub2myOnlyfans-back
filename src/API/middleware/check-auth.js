const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "V1CT0R_LA_6R055E_PUT3");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentification failed" });
    }
};