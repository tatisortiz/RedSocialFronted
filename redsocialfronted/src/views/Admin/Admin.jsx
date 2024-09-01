import { UserCard } from "../../components/User-card/UserCard";
import "./Admin.css";
import { getAllUsers, getPostByUserId } from "../../Services/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Admin = () => {
    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const bringAllUsers = async () => {
            try {
                const AllUsers = await getAllUsers(token);
                if (AllUsers.success) {
                    setUsers(AllUsers.data);
                } else {
                    console.error("Error fetching users:", AllUsers.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                navigate('/login');
            }
        };

        bringAllUsers();
    }, [token, navigate]);

    useEffect(() => {
        const bringPostUserById = async (id) => {
            try {
                const AllPostUser = await getPostByUserId(id, token);
                if (AllPostUser.success) {
                    setPosts((prevPosts) => [
                        ...prevPosts,
                        {
                            user_id: id,
                            posts: AllPostUser.data
                        }
                    ]);
                } else {
                    console.error("Error fetching posts for user:", AllPostUser.message);
                }
            } catch (error) {
                console.error("Error fetching posts for user:", error);
                navigate('/login');
            }
        };

        if (users.length > 0) {
            users.forEach((user) => {
                bringPostUserById(user._id);
            });
        }
    }, [users, token, navigate]);

    const bringPostsUser = (user_id) => {
        const userPostsData = posts.find((post) => post.user_id === user_id);
        if (userPostsData) {
            return userPostsData.posts;
        } else {
            console.error(`No posts found for user with id: ${user_id}`);
            return [];
        }
    };

    return (
        <div className="admin-container">
            {users.map((user) => (
                <UserCard 
                    key={user._id}
                    id={user._id}
                    firstName={user.first_name}
                    lastname={user.last_name}
                    email={user.email}
                    posts={bringPostsUser(user._id).length}
                >
                    <h2><Link className="link-user-container" to={`/userPosts/${user._id}/${user.first_name}/${user.last_name}`}>View Posts</Link></h2>
                </UserCard>
            
            ))}
        </div>
    );
};
