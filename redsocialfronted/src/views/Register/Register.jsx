import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/apiCalls";

import "./Register.css"



export const Register = () => {
  const navigate = useNavigate ()
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
  });

  function handleChange(e) {
    console.log("Handle Change");

    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  async function register() {
		try {
     
      const response = await registerUser(credentials)


      if(response.success){
        navigate('/login')
     } else{
      alert (response.message)

     }

    } catch (error) {
			console.log(error);
		}
	}
  
  

  console.log(credentials);

  return (
  
      <div className="register-container">
        <div className="register-div">
          <div className="register-title">
            <span>Please sign up!</span>
          </div>
          <div className="register-subtitle">
            Create an account or login
          </div>        
          
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            className="input-field"
            type="text"
            name="email"  
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          
          <input className="register-button" type="button" value="Register" onClick={register} />
          <div className="register-div-link">
              <a className="register-div-a">Already have an account?- </a><a className="register-div-a-link" onClick={()=>{navigate('/login');}}> Sign In</a>
          </div>
        </div>
      </div>
  );
};
