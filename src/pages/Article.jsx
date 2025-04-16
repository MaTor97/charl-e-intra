import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';
import { fetchURL } from '../assets/files/functions/fetch';
import { stripHtml, decodeHtml } from '../assets/files/functions/cleanHTML';

const Article = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchURL(`posts/${postId}`);
        const commentsData = await fetchURL(`comments?post=${postId}`);
        setComments(commentsData);
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

      <div className="commentBox">
        <p id='title'>Commentaires</p>
        {comments.map((comment) => {
          const avatarUrl = Object.values(comment.author_avatar_urls).pop();

          return (
            <div className="comment" key={comment.id}>
              <img src={avatarUrl} alt="avatar" />
              <div className="comContent">
                <div className="nameNDate">
                  <strong className="author-name">{comment.author_name}</strong>
                  <div className="timestamp">
                    {new Date(comment.date).toLocaleString()}
                  </div>
                </div>
                <span>{parse(comment.content.rendered)}</span>
              </div>
            </div>
          );
        })}
        <textarea placeholder='Laissez un commentaire...'></textarea>
        <button>publier</button>
      </div>
      
    </main>
  );
};

export default Article;
