import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import imageLogin from "../assets/female-avatar.svg";


const LoginForm = ({onLogin}) => {
   const handleGoogleLogin = async () => { 
        
        try {
            const result = await signInWithPopup(auth, provider);//show google popup to login
            const user = result.user;//get user info
            localStorage.setItem("plannerUser", user.displayName); //save user name to localStorage
            onLogin(user.displayName);//call parent function to update user 
        } catch (error) {
            console.error("Google login failed", error); 
            alert("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center 
        items-center p-6 bg-[#f3ecff]">
            <img 
            src={imageLogin}
            alt="imageLogin" 
            className="w-40 animate-bounce-slow" 
            />

          <div className="bg-white p-6 rounded-2xl 
          shadow-lg border-4 
          border-[#a18bff] w-80">
            <h2 className="mb-4 text-xl font-bold 
            text-center text-[#2e2e2e] ">
              Welcome to your planner 
              📓
            </h2>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[#a18bff] 
              text-white font-semibold p-2 rounded 
              hover:bg-[#8b72ff] 
              transition duration-300 shadow-md"
            >
              🌐 Enter with Google
            </button>
          </div>
        </div>
      );
    };
export default LoginForm;