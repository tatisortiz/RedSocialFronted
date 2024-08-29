import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../Services/apiCalls";
import { CInput } from '../../components/CInput/CInput.jsx';



export const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    // password: "",
   
    
  });
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    // // password: "",
    
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
    setEditData({
      name: profileData.name,
      email: profileData.email,
      // email: profileData.password,
      
    });
    setEditting(!editting);
  };

  const editInputHandler = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmButtonHandler = async () => {
    const response = await updateProfile(editData, token);
    if (response.success) {
      setProfileData(editData);
      
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p className={editting ? "hidden" : ""}>
        Name: {profileData.name ? profileData.name : "not available"}
      </p>
      <CInput
        type="text"
        name="name"
        placeholder="name"
        className={editting ? "" : "hidden"}
        emitFunction={editInputHandler}
        value={editData.name}
      />
         <p className={editting ? "hidden" : ""}>
        Email: {profileData.email}
      </p>

       <CInput
        type="text"
        name="email"
        placeholder="email"
        className={editting ? "" : "hidden"}
        emitFunction={editInputHandler}
        value={editData.email}
      />
    
      {/* {<CInput
        type="password"
        name="password" 
        placeholder="password"
        className={editting ? "" : "hidden"}
        emitFunction={editInputHandler}
        value={editData.passport}
      /> } */}
      
   
    
      <CInput
        type="button"
        name="edit"
        value={editting ? "cancel" : "edit"}
        emitOnClickButton={editButtonHandler}
      />
      <CInput
        type="button"
        name="save"
        value="save"
        className={editting ? "" : "hidden"}
        emitOnClickButton={confirmButtonHandler}
      />
    </div>
  );
};