import React, { useState } from "react";

function FormBook() {
    const [titre, setTitre] = useState("");
    const [auteur, setAuteur] = useState("");
    const [image, setImage] = useState("");
    const [page, setPage] = useState("");
    const [selectedEtat, setSelectedEtat] = useState("lire");
    const [genre, setGenre] = useState("");
    const token = localStorage.getItem('token'); 

    const isValidImageUrl = (url) => {
        const imageUrlPattern = /\.(jpeg|jpg|gif|png|bmp)$/;

        return imageUrlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (titre.length < 3) {
            alert("Le titre doit comporter au moins 3 caractères.");
            return;
        }

        if (!/^[A-Za-z\s]{3,}$/.test(auteur)) {
            alert("L'auteur doit comporter au moins 3 caractères.");
            return;
        }

        // Vérifie si l'URL de l'image est valide
        if (!isValidImageUrl(image)) {
            alert("Veuillez entrer une URL d'image valide.");
            return;
        }


        if (!/^[A-Za-z\s]{3,}$/.test(genre)) {
            alert("Le genre doit comporter au moins 3 caractères.");
            return;
        }
                
        //validation et conversion de page
        const pageAsNumber = Number(page);
        if (isNaN(pageAsNumber) || pageAsNumber <= 0) {
            alert("Veuillez entrer un nombre de pages valide.");
            return;
        }

        //l'objet du livre
        const newBook = {
            titre,
            auteur,
            image,
            page: pageAsNumber,
            etat: selectedEtat,
            genre,
        };
        console.log("Données envoyées:", newBook);

        try {
            const response = await fetch('http://localhost:3000/api/books/addBook', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json" // Indiquez que le contenu est JSON
                },
                body: JSON.stringify(newBook) // Convertissez l'objet en JSON
            });
        
            if (response.ok) {
            const addedBook = await response.json();
            console.log("Livre ajouté avec succès:", addedBook);
            alert("Livre ajouté avec succès !");
        } else {
            console.error("Échec de l'ajout du livre");
            alert("Échec de l'ajout du livre");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du livre:", error);
        alert("Erreur lors de l'ajout du livre");
    }

        setTitre("");
        setAuteur("");
        setImage("");
        setPage("");
        setSelectedEtat("lire");
        setGenre("");

    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setImage(url);
    };

    return(
        <form onSubmit={handleSubmit}>
        <label>
            Titre:
            <input value={titre} onChange={e => setTitre(e.target.value)} />
        </label>
        <label>
            Auteur:
            <input value={auteur} onChange={e => setAuteur(e.target.value)} />
        </label>
        <label>
            Image (URL):
            <input value={image} onChange={e => setImage(e.target.value)} type="text" />
        </label>
        <label>
            État de lecture:
        <select name={selectedEtat} onChange={(e) => setSelectedEtat(e.target.value)}>
        <option value="lire">À lire</option>
        <option value="en_cours">En cours de lecture</option>
        <option value="fini">Fini</option>
        </select>
        </label>
        <label>
            Nombre de pages:
            <input value={page} onChange={e => setPage(e.target.value)} type="number"/>
        </label>
        <label>
            Genre:
            <input value={genre} onChange={e => setGenre(e.target.value)} />
        </label>
        <button type="submit">Ajouter le livre</button>
        </form>

    )
    
}
export default FormBook;