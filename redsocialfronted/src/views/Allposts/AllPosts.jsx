import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../Services/apiCalls";
import { WorldPost } from "../../components/Post/WorldPost";
import "./AllPosts.css";

export const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const passport  = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;
    let statusPosts=null;

    useEffect(() => {
      if (!token) {
          navigate('/login');
          return;
      }else{
        const bringAllPosts = async () => {
          try {
              const AllPosts = await getAllPosts(token);
              if (AllPosts.success) {
                  setPosts(AllPosts.data);
              } else {
                statusPosts=0
              }
          } catch (error) {
              console.error("Error fetching posts:", error);
              navigate('/login');
          }
        };
        bringAllPosts();        
      }
  }, [navigate, token]);

    return (
        <div className="all-posts-body">
          <div className="all-posts-wrapper">
            <div className="all-posts-container">
              {posts.length ? (
                <div className="allList">
                    {posts.map((post) => (
                      <WorldPost
                        key={post._id}
                        userId={post.user_id._id}
                        postId={post._id}
                        name={post.user_id.first_name+" "+post.user_id.last_name}
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
                    </div>
                </div>
              )}
            </div>

          </div>
          <div className="my-follows">
              
          </div>
        </div>
      );
    };
    