import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPostsByCategory } from '../assets/files/functions/fetchPostsByCategory';
import { LogoSVG, EmptySVG } from '../assets/files/SVG';
import { getPostImage } from '../assets/files/functions/getPostImage';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML'; 

const Posts = ({ navigate }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categories');
  const searchQuery = searchParams.get('search');
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        let data = [];

        if (categoryId) {
          data = await fetchPostsByCategory(categoryId);
        } else if (searchQuery) {
          const response = await fetch(`https://intranetprod2.acc-vdc.be/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}`);
          data = await response.json();
        }

        setPosts(data);

        const imagePromises = data.map(async (post) => {
          const imageUrl = await getPostImage(post);
          return { id: post.id, imageUrl };
        });

        const resolvedImages = await Promise.all(imagePromises);
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
        <EmptySVG />
        <p>Aucun article trouvé.</p>
        <button onClick={() => navigate("/posts?categories=66")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <ul className='articles'>
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="article" 
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          {images[post.id] && /\.(jpe?g|png|webp)$/i.test(images[post.id]) ? (
            <img src={images[post.id]} alt="Post" />
          ) : (
            <div className="defaultImage">
              <LogoSVG />
            </div>
          )}
          <h2>{stripHtml(decodeHtml(post.title.rendered))}</h2>
        </div>
      ))}
    </ul>
  );
};

export default Posts;
