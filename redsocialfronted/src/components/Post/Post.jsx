import { getPostById, likePostById, updatePosts, deletePostById} from "../../Services/apiCalls";
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
    const currentUserToken = passport ? passport.tokenData._id : null;
    const [editposts, setEditposts] = useState({ id: postId });
    const [editpostsupdate, setEditpostsupdate] = useState({
        title: "",
        description: "",
        id: null,
    });
    const [isLiked, setIsLiked] = useState(likes.includes(currentUserToken));
    const text = isLiked ? 'Liked' : 'Like';
    const buttonClassNameLike = isLiked ? 'post-like post-liked' : 'post-like';
    const [count, setCount] = useState(likes.length);
    const [isVisible, setIsVisible] = useState(true);
    const [currentEdit, setCurrentEdit] = useState(false);

    useEffect(() => {
        if (likes.includes(currentUserToken)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
        setEditpostsupdate({
            description: content,
            title: title,
        });
    }, []);

    const handleDestroy = () => {
        setIsVisible(false);
    };

    const handleClick = () => {
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
                    setIsLiked(responsePost.data.likes.includes(currentUserToken));
                }
            } else {
                console.error("Error updating post:", response.message);
            }
        } else {
            navigate('login');
            return;
        }
    };

    const editButtonHandler = () => {
        setCurrentEdit(!currentEdit);
        setEditpostsupdate({
            description: "",
            title: ""
        });
    };

    const saveButtonHandler = async () => {
        if (!userId) {
            console.error("User ID is missing");
            return;
        }
        const response = await updatePosts(editposts.id, editpostsupdate, token);
        if (response.success) {
            const responsePost = await getPostById(editposts.id, token);
            if (responsePost.success) {
                setEditpostsupdate({
                    description: responsePost.data.description,
                    title: responsePost.data.title,
                });
            }
            setCurrentEdit(!currentEdit);
        } else {
            console.error("Error updating post:", response.message);
        }
    };

    const editInputHandler = (e) => {
        setEditpostsupdate({
            ...editpostsupdate,
            [e.target.name]: e.target.value,
        });
    };

    const deletePostHandler = async () => {
        if (!token) {
            alert('You are not authorized to perform this action');
            navigate('/login');
            return;
        }
        const id = postId;
        const res = await deletePostById(token, id);
        if (res.success) {
            handleDestroy();
        } else {
            alert('Error deleting post. Verify your session');
        }
    };

    return (
        isVisible && (
            <div className="post-container">
                <div className="post-container-div">
                    <div className="post-header">
                        <span className="post-name">{name}</span>
                        <span className="post-email">{email}</span>
                    </div>
                    <div className="post-div">
                        {
                            currentEdit ? (
                                <textarea
                                    type="text"
                                    name="title"
                                    value={editpostsupdate.title}
                                    placeholder="New title"
                                    onChange={editInputHandler}
                                    className="input-field-i-edit-title" />
                            ) : (
                                <span className="post-title">{editpostsupdate.title}</span>
                            )
                        }
                        {
                            currentEdit ? (
                                <textarea
                                    type="text"
                                    placeholder="New description"
                                    value={editpostsupdate.description}
                                    name="description"
                                    onChange={editInputHandler}
                                    className="input-field-i-edit-description" />
                            ) : (
                                <div className="post-content">
                                    {editpostsupdate.description}
                                </div>
                            )
                        }
                        <div className="post-footer-content">
                            {
                                currentEdit ? (
                                    <button className="post-like" onClick={saveButtonHandler}>
                                        <span>Save</span>
                                    </button>
                                ) : (
                                    <>
                                        <button className={buttonClassNameLike} onClick={handleClick}>
                                            <span>{text} - {count}</span>
                                        </button>
                                        <button className="post-like" onClick={editButtonHandler}>
                                            <span>Edit</span>
                                        </button>
                                        <button className="post-like" onClick={deletePostHandler}>
                                            <span>Delete</span>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
