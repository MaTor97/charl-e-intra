import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPostsByCategory } from '../assets/files/functions/fetchPostsByCategory';
import { LogoSVG, EmptySVG } from '../assets/files/SVG';
import { getPostImage } from '../assets/files/functions/getPostImage';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML'; 

// Pages Posts, elles permette d'afficher tous les articles disponnibles dans une catégorie ou son contenu si il n'y en a pas,
// elles apparaissent en cliquant sur une catégorie du nav
const Posts = ({ navigate }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categories');
  const searchQuery = searchParams.get('search');
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  // Extraire l'id de la video Youtube
  const extractYouTubeId = (html) => {
    const match = html.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s"&?<>]+)/);
    return match ? match[1] : null;
  };
  

  // Initialise la catéogrie quand la page est appellée
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        let data = [];

        // Se sert de fetchPostsByCategory pour aller chercher l'url wp /posts?categories={categoryId}
        if (categoryId) {
          data = await fetchPostsByCategory(categoryId);
        } else if (searchQuery) {
          // Gère la recherche
          const response = await fetch(`https://intranetprod2.acc-vdc.be/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}`);
          data = await response.json();
        }

        setPosts(data);

        // Va chercher l'url de l'image dans wp:featuredmedia
        const imagePromises = data.map(async (post) => {
          const imageUrl = await getPostImage(post);
          return { id: post.id, imageUrl };
        });

        // Attend la fin de toutes les promesses
        const resolvedImages = await Promise.all(imagePromises);

        // On transforme le tableau d'objets { id, imageUrl } en un objet
        // dont les clés sont les identifiants des posts, et les valeurs les URLs des images
        const imagesObj = resolvedImages.reduce((acc, { id, imageUrl }) => {
          acc[id] = imageUrl;
          return acc;
        }, {});

        setImages(imagesObj);
      } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [categoryId, searchQuery]); // écoute les deux !

  if (loading) return <div className="articles"><p>Chargement en cours...</p></div>;

  if (posts.length < 1) {
    return (
      <div className='EmptyArticles'>
        {/* GESTION DU POST VIDE */}
        <EmptySVG />
        <p>Aucun article trouvé.</p>
        <button onClick={() => navigate("/posts?categories=66")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <ul className='articles'>
      {/* AFFICHAGE DE LA LISTE DE POSTS */}
      {posts.map((post) => (
        <li 
          key={post.id} 
          className="article" 
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          {/* IMAGE */}
          { post.categories.includes(180) || post.categories.includes(94) ? 
            (() => {
              const videoId = extractYouTubeId(post.excerpt.rendered);
              return videoId ? (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube Thumbnail"
                />
              ) : (
                <div className="defaultImage">
                  <LogoSVG />
                </div>
              );
            })()
          : images[post.id] && /\.(jpe?g|png|webp)$/i.test(images[post.id]) ? (
            <img src={images[post.id]} alt="Post" />
          ) : (
            <div className="defaultImage">
              {/* IMAGE PAR DEFAUT SI PAS D'IMAGE */}
              <LogoSVG />
            </div>
          )}
          {/* TITRE */}
          <h2>{stripHtml(decodeHtml(post.title.rendered))}</h2>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
