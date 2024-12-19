import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {ToastContainer} from "react-toastify";
import { handleError, handleSuccess } from "../utils";


function Signup(){

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name,value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e)=>{
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if(!name || !email ||!password){
            return handleError('Enter data in all the fields bruh')
        }

        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message } = result;
            if(success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }

            console.log(result);
            
        } catch(err) {
            handleError(err);
        }
    }

    return(
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Bob"
                        value={signupInfo.name}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Bob123@gmail.com"
                        value={signupInfo.email}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={signupInfo.password}
                    />
                </div>         

                <button type="submit">Signup</button>
                <span>Already have an account?
                    <Link to="/Login">Login</Link>
                </span>   
            </form>

            <ToastContainer />

        </div>
    )
}


export default Signup