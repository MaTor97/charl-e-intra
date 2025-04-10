import { useState, useEffect } from 'react';
import { main } from "../assets/files/functions/hasChildrens"; // Importez `main` correctement
import SubCategories from './SubCategories';
import Posts from './Posts';

const Content = ({ page, setPage }) => {
    const [subCategoriesPages, setSubCategoriesPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await main(); // Résolvez la Promesse ici
            setSubCategoriesPages(data);
        };

        fetchData(); // Appel de la fonction pour charger les données
    }, []);

    return (
        <main className="content">
            {console.log("sub = ", subCategoriesPages)}
            {subCategoriesPages.includes(page) ? (
                <SubCategories page={page} setPage={setPage} />
            ) : (
                <Posts page={page} setPage={setPage} />
            )}
        </main>
    );
};

export default Content;
