import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPosts, getProfile } from "../../Services/apiCalls";
import { Post } from "../../components/Post/Post";
import "./MyPost.css";

export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    
    const [profileData, setProfileData] = useState({
      first_name: "",
      last_name: "",
      email: "",
    });
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


    return (
        <div className="my-posts-body">
          <div className="my-posts-wrapper">
            <div className="my-posts-container">
              {posts.length ? (
                <div className="list">
                    {posts.map((post) => (
                      <Post
                        key={post._id}
                        userId={post.user_id}
                        postId={post._id}
                        email={profileData.email}
                        name={profileData.first_name+" "+profileData.last_name}
                        title={post.title} 
                        content={post.description}
                        likes={post.likes}
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

          </div>
        </div>
      );
    };
    