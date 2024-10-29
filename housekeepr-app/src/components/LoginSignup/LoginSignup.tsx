import "./LoginSignup.css";
import user_icon from "../assets/user_icon.svg";
import password_icon from "../assets/password_icon.svg";

const LoginSignup = () => {
  return (
    <div className="signupcontainer">
      <div className="header">
        <div className="text">Log in</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="passsword" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">
          <button className="login-button">Log In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
