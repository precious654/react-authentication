import React from "react";
import Parse from "parse"
import Authnavbar from "../components/Authnavbar";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        setFormData( (prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const signUpUser = async () => {
        try {
          const newUser = new Parse.User();
          newUser.set("username", formData.username);
          newUser.set("email", formData.email);
          newUser.set("password", formData.password);
          const user = await newUser.signUp();
      
          let Wallet = Parse.Object.extend("Wallet");
          let wallet = new Wallet();
      
          let userPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: user.id,
          };
      
          wallet.set("owner", userPointer);
          wallet.set("balance", 100);
          wallet.save();
      
          console.log(`${user} have successfully signed up`);
          navigate("/login");
        } catch (error) {
          console.log("you encountered an error signing up");
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        signUpUser();
    }

  return (
    <>
        <Authnavbar type="signup" />
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder='Username...' onChange={handleChange} value={formData.username}/>
            <input type="email" name="email" placeholder='Email...' onChange={handleChange} value={formData.email}/>
            <input type="password" name="password" placeholder='Password...' onChange={handleChange} value={formData.password}/>
            <div>
                <button>Sign Up</button>
            </div>
        </form>
    </>
  )
}

export default Signup;