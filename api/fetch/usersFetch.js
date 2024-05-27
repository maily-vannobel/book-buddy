async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur réseau");
    }

    return response.json();
}
async function register(username, email, password) {
    try {
        const response = await fetch(
            "http://localhost:8080/api/user/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            }
        );
        const data = await response.json();
        if (response.ok) {
            console.log("Enregistrement réussi");
        } else {
            console.error("Erreur lors de l'enregistrement:", data.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
    }
}
async function login(username, password) {
    try {
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log("Connexion réussie");
        } else {
            console.error("Erreur lors de la connexion:", data.message);
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
    }
}
function logout() {
    localStorage.removeItem("token");
    console.log("Déconnexion réussie");
}
async function updatePassword(oldPassword, newPassword) {
    try {
        const data = await fetchWithAuth(
            "http://localhost:3000/api/user/updatePassword",
            {
                method: "PUT",
                body: JSON.stringify({ oldPassword, newPassword }),
            }
        );
        console.log("Mot de passe mis à jour avec succès", data);
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour du mot de passe:",
            error.message
        );
    }
}
async function getUserInfo() {
    try {
        const data = await fetchWithAuth(
            "http://localhost:8080/api/user/users",
            {
                method: "GET",
            }
        );
        console.log(
            "Informations de l'utilisateur récupérées avec succès",
            data
        );
        return data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des informations de l'utilisateur:",
            error.message
        );
    }
}
