import React from "react";
import ArticleImage from "../assets/images/remote.jpg";

const Article = () => {
    return (
        <main>
            <h1>La révolution du télétravail</h1>
            <div className="imageContainer">
                <img src={ArticleImage} alt="Télétravail" />
            </div>
            <p>Depuis la pandémie, le télétravail est devenu une norme dans de nombreuses entreprises. Flexibilité, réduction des trajets et meilleur équilibre entre vie privée et professionnelle sont les principaux avantages. Toutefois, la frontière entre travail et repos devient floue, et l'isolement social peut peser sur les employés. Les entreprises cherchent encore le bon équilibre entre présence physique et télétravail.</p>
        </main>
    );
}

export default Article;
