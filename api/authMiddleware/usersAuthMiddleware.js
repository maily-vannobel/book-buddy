const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Récupère token depuis l'en-tête Authorization
    const token =
        req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ message: "Accès refusé. Pas de token fourni." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide." });
    }
};