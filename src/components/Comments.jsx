
import { fetchURL } from '../assets/files/functions/fetch';
import { timeAgo } from '../assets/files/functions/timeAgo'
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

// Composant Commenataires, les affiches sous l'article sous condition :
// les commentaires ne sont possible que dans les catégories NEWS et CHARLEROI HD
const Comments = ({ postId }) => {
      const [comments, setComments] = useState([]);

      // Initialise les commentaires de la page
      useEffect(() => {
        const loadPost = async () => {
          try {
            const commentsData = await fetchURL(`comments?post=${postId}`);
            setComments(commentsData);
          } catch (error) {
            console.error("Erreur de récupération du post:", error);
            setComments(null);
          }
        };
      
        loadPost();
      }, [postId]);     
    
      return (
        <div className="commentBox">
          {/* SECTION COMMENTAIRES */}
        <p id='title'>Commentaires</p>
        {comments.map((comment) => {
          const avatarUrl = Object.values(comment.author_avatar_urls).pop();
            {/* COMMENTAIRES UN PAR UN */}
            return (
                <div className="comment" key={comment.id}>
                    <div className="user">
                      <img src={avatarUrl} alt="avatar" />
                        <div className="nameNDate">
                            <strong className="author-name">{comment.author_name}</strong>
                            <div className="timestamp">
                                {timeAgo(comment.date)}
                            </div>
                        </div>
                    </div>
                    <div id='comContent'>{parse(comment.content.rendered)}</div>
                </div>
            )
        })}
        {/* AJOUTER UN COMMENTAIRE */}
        <textarea placeholder='Laissez un commentaire...'></textarea>
        <button>PUBLIER</button>
      </div>
      );  
}

export default Comments