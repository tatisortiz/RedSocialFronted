import { getPostById, likePostById} from "../../Services/apiCalls";
import "./WorldPost.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WorldPost = ({
    userId="",
    postId = "",
    name = "Not available",
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
            <div className="allPost-container">
                <div className="allPost-container-div">
                    <div className="allPost-header">
                        <span className="allPost-name">{name}</span>
                    </div>
                    <div className="allPost-div">
                        <span className="allPost-title">{title}</span>    
                        <div className="allPost-content">
                            {content}
                        </div>
                        <div className="allPost-footer-content">
                            <button className={buttonClassNameLike} onClick={handleClick}>
                                <span>{text} - {count} </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
};
