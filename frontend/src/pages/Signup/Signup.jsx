import React from "react";
import { Link } from "react-router-dom";
import { SignupWrapper } from "./Signup.styled";

const Signup = () => {
  return (
    <SignupWrapper>
      <div className="image_starter_page">
        {/* RENDERING THE BG IMAGE FROM PUBLIC FOLDER */}
      </div>

      <div className="right_container">
        <div className="form_container">
          <h1 className="header">Sign up</h1>

          <form>
            <input type="email" placeholder="Enter your email"></input>
            <button className="btn_purple">Sign up</button>
          </form>

          <div className="have_account">
            <p>Already have an account?</p> <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </SignupWrapper>
  );
};

export default Signup;
