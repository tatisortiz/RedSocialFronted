import { useParams } from 'react-router-dom';
import "./UserPosts.css"
import { WorldPost } from "../../components/Post/WorldPost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostByUserId } from "../../Services/apiCalls";


export const UserPosts = () => {
    const { userId, firstname, lastname } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const passport  = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;

    useEffect(() => {
      if (!token) {
          navigate('/login');
          return;
      }else{
        
        const bringPostUserById = async (id) => {
            try {
                const AllPostUser = await getPostByUserId(id, token);
                if (AllPostUser.success) {
                    setPosts(AllPostUser.data);
                } else {
                    console.error("Error fetching posts for user:", AllPostUser.message);
                }
            } catch (error) {
                console.error("Error fetching posts for user:", error);
                navigate('/login');
            }
        };
        bringPostUserById(userId);
      }
  }, []);
    return(<> 
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
                        name={firstname+" "+lastname    }
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
    </>);
}