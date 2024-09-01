import { getPostById, likePostById } from "../../Services/apiCalls";
import "./WorldPost.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WorldPost = ({
    userId = "",
    postId = "",
    name = "Not available",
    title = "",
    content = "",
    likes = [],
}) => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;

    const currentUserToken=passport?passport.tokenData._id:null;
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(likes.length);
    const text = isLiked ? 'Liked' : 'Like';
    const buttonClassNameLike = isLiked ? 'post-like post-liked' : 'post-like';

    useEffect(() => {
        setIsLiked(likes.includes(currentUserToken)); 
        console.log(isLiked)
    }, [likes, currentUserToken]);

    const handleClick = () => {
        likeButtonHandler();
    };

    const likeButtonHandler = async () => {
        if (token) {
            if (!postId) {
                console.error("Post ID is missing");
                return;
            }
            const response = await likePostById(postId, token);
            if (response.success) {
                const responsePost = await getPostById(postId, token);
                if (responsePost.success) {
                    setCount(responsePost.data.likes.length);
                    setIsLiked(responsePost.data.likes.includes(currentUserToken)); 
                }
            } else {
                console.error("Error updating post:", response.message);
            }
        } else {
            navigate('/login');
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
    );
};
