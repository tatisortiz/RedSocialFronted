import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../Services/apiCalls";
import { CInput } from '../../components/CInput/CInput.jsx';
import { MyPosts } from "../MyPost/MyPost.jsx";

import { Link } from "react-router-dom";
import "./Profile.css";


export const Profile = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  const [editting, setEditting] = useState(false);
  const passport = JSON.parse(localStorage.getItem("passport"));
  
  const navigate = useNavigate();
  const token = passport?.token;

  useEffect(() => {
    if (!passport) {
      navigate("/login");
    } else {
      const bringMyProfile = async () => {
        const response = await getProfile(passport.token);
        setProfileData(response.data);
      }
      bringMyProfile();
    }
  }, [passport]);


  const editButtonHandler = () => {
    if (editting) {
        setEditData({
            first_name:"",
            last_name:"",
            name: "",
            email: "",
            password:""
        });
    } else {
        setEditData({
            first_name:profileData.first_name,
            last_name:profileData.last_name,
            email: profileData.email,
            password: profileData.password
        });
    }
    setEditting(!editting);
    console.log(editting)
  };

  const editInputHandler = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmButtonHandler = async () => {
    if(editData.email==""||editData.password==""){
      alert("email o password no empty")
    }else{
      const response = await updateProfile(editData, token);
      if (response.success) {
          setProfileData(editData);
          setEditting(false);
      }
    }
};

  return (
    <>
    <div className="profile-container">
      <div className="banner">  
        My WallyPosts    
      </div>
      <div className="profile">
        <div className="profile-user-information">         
          <p className={editting ? "hidden" : "p-information"}>
            My FirstName:<a>{profileData.first_name!="" ? profileData.first_name:"not available"}</a>
          </p>  
          <p className={editting ? "hidden" : "p-information"}>
            My Lastname:<a>{profileData.last_name!="" ? profileData.last_name:"not available"}</a>
          </p>  
          <p className={editting ? "hidden" : "p-information"}>
            My Name:<a> {profileData.first_name!="" ? profileData.first_name + " "+profileData.last_name : "not available"}</a>
          </p>  
          <p className={editting ? "hidden" : "p-information"}>
            Email: <a>{profileData.email}</a>
          </p>
          <p className={editting?"p-information":"hidden"}>
            Edit your information here!
          </p>
          <CInput
          type="text"
          name="first_name"
          placeholder="FirstName"
          className={editting ? "input-field-i" : "hidden"}
          emitFunction={editInputHandler}
          value={editData.first_name}
          />
          <CInput
            type="text"
            name="last_name"
            placeholder="LastName"
            className={editting ? "input-field-i" : "hidden"}
            emitFunction={editInputHandler}
            value={editData.last_name}
          />
          <CInput
            type="text"
            name="email"
            placeholder="email"
            className={editting ? "input-field-i" : "hidden"}
            emitFunction={editInputHandler}
            value={editData.email}
          />  
          <CInput
            type="password"
            name="password" 
            placeholder="password"
            className={editting ? "input-field-i" : "hidden"}
            emitFunction={editInputHandler}
            value={editData.passport}
          /> 
          <CInput
            type="button"
            name="edit"
            className="button"
            value={editting ? "Cancel" : "Edit"}
            emitOnClickButton={editButtonHandler}
          />
          <CInput
            type="button"
            name="save"
            value="Save"
            className={editting ? "button" : "hidden"}
            emitOnClickButton={confirmButtonHandler}
          />
          <Link to="/createPost" id="create-btn" className="button button-createPost">Create Post</Link>
        </div>
        <div className="profile-posts">
          <MyPosts>
          </MyPosts>
        </div>
      </div>
    </div>

    </>
  );
};