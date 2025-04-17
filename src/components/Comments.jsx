import { fetchURL } from '../assets/files/functions/fetch';
import { timeAgo } from '../assets/files/functions/timeAgo'
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const Comments = ({ postId }) => {
      const [comments, setComments] = useState([]);
    
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
                                {timeAgo(comment.date)}
                            </div>
                        </div>
                        <span>{parse(comment.content.rendered)}</span>
                    </div>
                </div>
            )
        })}
        <textarea placeholder='Laissez un commentaire...'></textarea>
        <button>publier</button>
      </div>
      );  
}

export default Comments