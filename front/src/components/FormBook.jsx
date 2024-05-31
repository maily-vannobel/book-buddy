import React, { useState } from "react";

function FormBook(){
    const [titre, setTitre] = useState("");
    const [auteur, setAuteur] = useState("");
    const [image, setImage] = useState("");
    const [page, setPage] = useState("");
    const [selectedEtat, setSelectedEtat] = useState("lire");
    const [genre, setGenre] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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

        // Vous pouvez maintenant envoyer `newBook` à votre backend ou faire ce que vous voulez avec.
        console.log(newBook);

        //réinitialise le formulaire
        setTitre("");
        setAuteur("");
        setImage("");
        setPage("");
        setSelectedEtat("lire");
        setGenre("");

        // script pour gerer les images
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
            Image:
            <input type="file" value={image} onChange={e => setImage(e.target.value)} />
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