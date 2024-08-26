import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/apiCalls";



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
  
      <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <h2>Create an account or login</h2>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"  
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        
        <input type="button" value="Register" onClick={register} />
        </div>
      </div>
  );
};
