import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';
import { fetchURL } from '../assets/files/functions/fetch';
import Comments from '../components/Comments';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML';

// Page Article, les pages articles affichent le contenu des articles et sont appellées par les pages posts
// ils affichent leus titres, contenu html, date de publication et commentaires
const Article = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Changer la date au format européen
  function formatEuropean(dateString) {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');
  
    return `${day}/${month}/${year} à ${hour}:${minute}:${second}`;
  }
  
  // Initialisation de l'article ` 
  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchURL(`posts/${postId}`);
        setPost(data);
      } catch (error) {
        console.error("Erreur de récupération du post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  // Chargement
  if (loading) {
    return <div className="articles"><p>Chargement en cours...</p></div>;
  }

  // gestion d'erreur
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="article-detail">
      {/* TITRE */}
      <h1>{stripHtml(decodeHtml(post.title.rendered))}</h1>
      {/* CONTENU DE L'ARTICLE FORMATE AVEC HTML PARSER ET OPTIONS.JS DANS ASSETS */}
      <div>{parse(post.content.rendered, htmlParserOptions)}</div>
      {/* VERIFIER SI L'ARTICLE VIENT DE NEWS OU CHARLEROI HD */}
      {post.categories.includes(54)|| post.categories.includes(94) ? 
        <div id='foot'>
          {/* DATE */}
          <p id="date">{formatEuropean(post.date)}</p>
          {/* COMMENTAIRES */}
          <Comments postId={postId} /> 
        </div>
        : null}
    </main>
  );
};

export default Article;
