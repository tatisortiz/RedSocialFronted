import { getPostById, likePostById } from "../../Services/apiCalls";
import "./Post.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Post = ({
    userId="",
    postId = "",
    name = "Not available",
    email = "Not available",
    title = "",
    content = "",
    likes=[],
}) => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;
    const [editposts, setEditposts] = useState({
        id: postId,
    });
    const [isLiked, setIsLiked] = useState(false);
    const text = isLiked ? 'Liked' : 'Like';
    const buttonClassNameLike = isLiked ? 'post-like post-liked' : 'post-like';
    const [count, setCount] = useState(likes.length);
    useEffect(() => {
        setIsLiked(false)
        if (likes.includes(userId)){
            setIsLiked(!isLiked)
        }
      }, []);
    const handleClick = () => {
        setIsLiked(!isLiked);
        const updatedCount = isLiked ? count - 1 : count + 1;
        setCount(updatedCount);
        likeButtonHandler();
    };

    const likeButtonHandler = async () => {
        if (token) {
            if (!editposts.id) {
                console.error("Post ID is missing");
                return;
            }

            const response = await likePostById(editposts.id, token);
            if (response.success) {
                const responsePost = await getPostById(editposts.id, token);
                if (responsePost.success) {
                    setCount(responsePost.data.likes.length);
                }
            } else {
                console.error("Error updating post:", response.message);
            }
        } else {
            navigate('login');
            return;
        }
    };

    return (
        <div className="post-container">
            <div className="post-container-div">
                <div className="post-header">
                    <span className="post-name">{name}</span>
                    <span className="post-email">{email}</span>
                </div>
                <div className="post-div">
                    <span className="post-title">{title}</span>
                    <div className="post-content">
                        {content}
                    </div>
                    <div className="post-footer-content">
                        <button className={buttonClassNameLike} onClick={handleClick}>
                            <span>{text}</span>
                            <span>{count}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
