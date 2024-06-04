import React, { useState } from "react";
import { register, login } from "../services/usersFetch";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();
        setError(null);
        try {
            const registerResponse = await register(username, email, password);

            if (!registerResponse.ok) {
                setError("Erreur lors de l'enregistrement.");
                return;
            }

            const registerData = registerResponse.data;

            if (registerData) {
                const loginResponse = await login(username, password);

                if (!loginResponse.ok) {
                    setError("Erreur lors de la connexion.");
                    return;
                }

                const loginData = loginResponse.data;

                if (loginData && loginData.token) {
                    localStorage.setItem("token", loginData.token);
                    navigate("/");
                } else {
                    setError(
                        "Erreur lors de la connexion: réponse non valide."
                    );
                }
            } else {
                setError(
                    "Erreur lors de l'enregistrement: réponse non valide."
                );
            }
        } catch (error) {
            setError(
                `Erreur lors de l'enregistrement ou de la connexion: ${error.message}`
            );
            console.error("Erreur:", error);
        }
    };

    return (
        <>
            <div className="center-div">
                <div className="wrapper">
                    <form onSubmit={handleRegister}>
                        <h2>Inscription</h2>
                        {error && <p className="error">{error}</p>}
                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <label>Nom d'utilisateur</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label>Mot de passe</label>
                        </div>
                        <div className="showPassword">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label>Afficher le mot de passe</label>
                        </div>
                        <button type="submit">Créer mon compte</button>
                        <div className="register">
                            <p>
                                Vous avez déjà un compte?<br></br>
                                <a href="http://localhost:3001/login">
                                    Connectez-vous !
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
