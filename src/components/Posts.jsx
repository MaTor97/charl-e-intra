import { useEffect, useState } from "react";
import { fetchPostsByCategory } from "../assets/files/functions/fetchPostsByCategory";
import { decodeHtml } from "../assets/files/functions/decodeHTML";
import { getPostImage } from "../assets/files/functions/getPostImage";
import { stripHtml } from "../assets/files/functions/filterHTML";
import { LogoSVG } from "../assets/files/SVG";
import NoContent from "./NoContent"

const Posts = ({ page, setPage }) => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({}); // State to store the images by post ID
    const [loading, setLoading] = useState(true); // State to handle loading indicator

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true); // Indicate that data is being fetched
            const data = await fetchPostsByCategory(page);
            setPosts(data);

            // Load images for each post
            const imagePromises = data.map(async (post) => {
                const imageUrl = await getPostImage(post);
                return { id: post.id, imageUrl }; // Store the image URL with the post ID
            });

            // Wait for all image promises to resolve and update state
            const resolvedImages = await Promise.all(imagePromises);
            const imagesObj = resolvedImages.reduce((acc, { id, imageUrl }) => {
                acc[id] = imageUrl;
                return acc;
            }, {});

            setImages(imagesObj);
            setLoading(false); // Data fetching is complete
        };
        loadPost();
    }, [page]);

    return (
        <div className="articles">
            {loading ? (
                <div className="loading">Chargement...</div> // Loading indicator
            ) : posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="article">
                        {images[post.id] && /\.(jpe?g|png)$/i.test(images[post.id]) ? (
                            <img src={images[post.id]} alt="Post" />
                        ) : (
                            <div className="defaultImage">
                                <LogoSVG />
                            </div>
                        )}
                        <h2>{stripHtml(decodeHtml(post.title.rendered))}</h2>
                    </div>
                ))
            ) : (
                <NoContent />
            )}
        </div>
    );
};

export default Posts;
