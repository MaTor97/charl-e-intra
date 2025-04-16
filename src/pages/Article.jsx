import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';
import { fetchURL } from '../assets/files/functions/fetch';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML';

const Article = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const data = await fetchURL(`posts/${postId}`);
        setPost(data); // data est un objet ici
      } catch (error) {
        console.error("Erreur de récupération du post:", error);
        setPost(null);
      }
      setLoading(false);
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="article-detail">
      <h1>{stripHtml(decodeHtml(post.title.rendered))}</h1>
      <div>{parse(post.content.rendered, htmlParserOptions)}</div>
      <p id='date'>{post.date}</p>
    </main>
  );
};

export default Article;
