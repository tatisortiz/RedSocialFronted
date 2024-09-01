import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePostById, getMyPosts, updatePosts, getProfile } from "../../Services/apiCalls";
import { useAuth } from "../../contexts/AuthContexts";
import { Post } from "../../components/Post/Post";
import "./MyPost.css";

export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [editposts, setEditposts] = useState({
        title:"",
        description: "",
        id: null,
    });
    const [profileData, setProfileData] = useState({
      first_name: "",
      last_name: "",
      email: "",
    });
    const [editting, setEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const navigate = useNavigate();
    const passport  = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;
    let statusPosts=null

    useEffect(() => {
      if (!token) {
          navigate('/login');
          return;
      }else{
        const bringMyPosts = async () => {
          try {
              const MyPosts = await getMyPosts(token);
              if (MyPosts.success) {
                  setPosts(MyPosts.data);
              } else {
                statusPosts=0
              }
          } catch (error) {
              console.error("Error fetching posts:", error);
              navigate('/login');
          }
        };
        bringMyPosts();
        
        const bringMyProfile = async () => {
          try{
            const response = await getProfile(passport.token);
            if(response.success){
              setProfileData(response.data);
            }
          }catch(error){
            console.error("Error fetching profile:", error);
            navigate('/login');
          }
        }
        bringMyProfile();
      }
  }, [navigate, token]);

    const editInputHandler = (e) => {
        setEditposts({
            ...editposts,
            [e.target.name]: e.target.value
        });
    };

    const editButtonHandler = (post) => {
        setEditposts({
            description: post.description,
            id: post._id
        });
        setCurrentEditId(post._id);
        setEditing(true);
    };

    const deletePostHandler = async (e) => {
        if (!token) {
            alert('You are not authorized to perform this action');
            navigate('/login');
            return;
        }
        const id = e.target.name;
        const res = await deletePostById(token, id);
        if (res.success) {
            const remainingPosts = posts.filter((post) => post._id !== id);
            setPosts(remainingPosts);
        } else {
            alert('Error deleting post. Verify your session');
        }
    };

    const confirmButtonHandler = async () => {
        if (!editposts.id) {
            console.error(error);
            return;
        }
        const response = await updatePosts(editposts.id, editposts, token);
        if (response.success) {
            const newData = await getMyPosts(token);
            setPosts(newData.data);
            setEditing(false);
            setCurrentEditId(null);
        } else {
            console.error("Error updating post:", response.message);
        }
    };

    return (
        <div className="my-posts-body">
          <div className="my-posts-wrapper">
            <div className="my-posts-container">
              <h1 className="my-posts-title">My Posts Dashboard</h1>
              {posts.length ? (
                <div className="list">
                    {posts.map((post) => (
                      <Post
                        key={post._id}
                        email={profileData.email}
                        name={profileData.first_name+" "+profileData.last_name}
                        title={post.title} 
                        content={post.description}
                      />
                      ))}                
                </div>
              ) : (
                <div className="no-posts-wrapper">
                  <div className="no-posts-container">
                    <p className="no-posts-message">No posts found.</p>
                    <p className="create-post-message">Why not create one?</p>
                    </div>
                </div>
              )}
            </div>
            <Link to="/createPost" className="create-post-link">Create Post</Link>

          </div>
        </div>
      );
    };
    /* 
    <tr key={post._id}>
      <td>
        {currentEditId === post._id && editting ? (
          <input
            type="text"
            name="title"
            value={editposts.title}
            onChange={editInputHandler}
            className="form-control edit-input" />
        ) : (
          post.title || 'Not available'
        )}
      </td>
      <td>
        {currentEditId === post._id && editting ? (
          <input
            type="text"
            name="description"
            value={editposts.description}
            onChange={editInputHandler}
            className="form-control edit-input" />
        ) : (
          post.description || 'Not available'
        )}
      </td>
      <td>
        {currentEditId === post._id && editting ? (
          <button
            type="button"
            onClick={confirmButtonHandler}
            className="btn btn-save"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => editButtonHandler(post)}
            className="btn btn-edit"
          >
            Edit
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          name={post._id}
          onClick={deletePostHandler}
          className="btn btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>*/