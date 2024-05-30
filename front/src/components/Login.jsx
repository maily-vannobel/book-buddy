import React, { useState } from "react";
import { login } from "../services/usersFetch";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login(username, password);
            if (response.ok) {
                const data = response.data;
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(
                    `Erreur lors de la connexion: ${response.data.message}`
                );
            }
        } catch (error) {
            setError(`Erreur lors de la connexion: ${error.message}`);
            console.error("Erreur lors de la connexion:", error);
        }
    };
    return (
        <>
            <div className="center-div">
                <div className="wrapper">
                    <form onSubmit={handleLogin}>
                        <h2>Connexion</h2>
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
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label>Mot de passe</label>
                        </div>
                        <div className="show-password">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label>Afficher le mot de passe</label>
                        </div>
                        <button type="submit">Se connecter</button>
                        <div className="Login">
                            <p>
                                Vous n'avez pas de compte?<br></br>
                                <a href="http://localhost:3000/register">
                                    Créer un compte !
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
