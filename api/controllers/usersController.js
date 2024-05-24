const bcrypt = require("bcrypt");
const { User, registerSchema, loginSchema } = require("../model/usersModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password, email } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Nom d'utilisateur déjà pris" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Nom d'utilisateur ou mot de passe incorrect",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Nom d'utilisateur ou mot de passe incorrect",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token, message: "Connexion réussie" });
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message:
                    "Les champs 'oldPassword' et 'newPassword' sont requis.",
            });
        }

        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Ancien mot de passe incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: "Mot de passe mis à jour avec succès",
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        res.status(500).json({ message: "Erreur du serveur", error });
    }
};
exports.getUserInfo = async (req, res) => {
    try {
        const userInfo = req.body;

        const user = await User.findById(userInfo);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.log("Utilisateur non trouvé");
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
};
