import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPostsByCategory } from '../assets/files/functions/fetchPostsByCategory';
import { useNavigate } from 'react-router-dom';
import { LogoSVG } from '../assets/files/SVG';
import { getPostImage } from '../assets/files/functions/getPostImage';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML'; 

const Posts = ({navigate}) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categories');
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});


  useEffect(() => {
    const loadPosts = async () => {
      if (categoryId) {
        const data = await fetchPostsByCategory(categoryId);
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
      }
    };
    loadPosts();
  }, [categoryId]);
  

  if (posts.length < 1) {
    return <div className='articles'>
              <p>Aucune catégorie disponnible</p>
              <button onClick={() => navigate("/posts?categories=66")}>Retour à l'acceuil!</button>
            </div>;
  }
  
 

  return (
      <ul className='articles' >
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
