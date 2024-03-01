import React from 'react'
import Parse from "parse"
import Authnavbar from "../components/Authnavbar";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    })

    const handleChange = (event) => {
        setFormData( (prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const logInUser = async () => {
        try {
          const user = await Parse.User.logIn(formData.username, formData.password);
          console.log('User logged in successfully:', user);
          navigate("/home");
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        logInUser();
    }



  return (
    <>
        <Authnavbar type="login" />
        <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder='Username...' onChange={handleChange} value={formData.username}/>
        <input type="password" name="password" placeholder='Password...' onChange={handleChange} value={formData.password}/>
        <div>
            <button>Log In</button>
        </div>
    </form>
    </>
  )
}

export default Login;