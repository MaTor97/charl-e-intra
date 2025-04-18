import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';
import { fetchURL } from '../assets/files/functions/fetch';
import Comments from '../components/Comments';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML';

const Article = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="articles"><p>Chargement en cours...</p></div>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="article-detail">
      <h1>{stripHtml(decodeHtml(post.title.rendered))}</h1>
      <div>{parse(post.content.rendered, htmlParserOptions)}</div>
      <p id="date">{post.date}</p>
      {post.categories[1] === 54 || post.categories[1] === 94 ? 
        <Comments postId={postId} /> 
        : null}
    </main>
  );
};

export default Article;
