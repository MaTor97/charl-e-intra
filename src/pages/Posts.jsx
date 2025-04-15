import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchURL } from '../assets/files/functions/fetch';
import { useNavigate } from 'react-router-dom';
import { LogoSVG } from '../assets/files/SVG';
import { getPostImage } from '../assets/files/functions/getPostImage';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML'; 

const Posts = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categories');
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      if (categoryId) {
        setLoading(true);
        const data = await fetchURL(`posts?categories=${categoryId}`);
        setPosts(data);

        // Récupère toutes les images liées aux posts
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
        setLoading(false);
      }
    };
    loadPosts();
  }, [categoryId]);

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
