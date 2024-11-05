import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "../assets/user_icon.svg";
import password_icon from "../assets/password_icon.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="
    loginpagecontainer
    flex 
    mt-40
    max-lg:mt-80
    max-sm:mt-80 
    p-2r
    max-lg:p-1r
    flex-col
    justify-self-center
    gap-3 
    rounded-lg
    drop-shadow-lg
    bg-white
    "
    >
      <div className="header mb-4">
        <div className="text text-3xl text-wine">Housekeepr</div>
      </div>
      <div className="inputs flex flex-col">
        <div className="input flex m-2 outline outline-1 outline-lightgrey p-1 rounded-lg">
          <img src={user_icon} alt="User Icon" />
          <input
            className="bg-transparent rounded-md bg-pearl pl-1"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input flex m-2 outline outline-1 outline-lightgrey p-1 rounded-lg">
          <img src={password_icon} alt="Password Icon" />
          <input
            className="bg-transparent rounded-md bg-pearl pl-1"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="submit-container flex self-center justify-center bg-wine text-white hover:bg-dustyblue rounded-lg p-1 w-20">
        <div className="submit">
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
