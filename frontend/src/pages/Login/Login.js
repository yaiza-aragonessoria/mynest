import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../features/slices/authSlice";
import {
  ErrorMessage,
  FormFields,
  LoginTitle,
  LoginWrapper,
  SignIn,
  Wrapper,
} from "./Login.styled";


const Login = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newWarning, setNewWarning] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.data);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setNewEmail(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: newEmail,
      password: newPassword,
    };
    axios
      .post("https://mynest.propulsion-learn.ch/backend/api/auth/token/", data)
      .then((res) => {
        setNewWarning("");
        const authData = {
          email: newEmail,
          access: res.data.access,
        };

        localStorage.setItem("access", authData.access);
        localStorage.setItem("email", authData.email);

        dispatch(setAuth(authData));

        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setNewWarning(error.response.data.detail);
      });
  };

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    const authData = {
      email: localStorage.getItem("email"),
      access: localStorage.getItem("access"),
    };

    if (authData.access) {
      dispatch(setAuth(authData));
    }
  }, []);

  return (
    <Wrapper>
      <div className="image_starter_page">
        {/* RENDER BG IMAGE HERE FROM PUBLIC ASSETS FOLDER */}
      </div>

      <div className="right_container">

        <LoginWrapper>
        <h1 className="header">Login</h1>
        <ErrorMessage>{newWarning}</ErrorMessage>
        {!auth && (
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <input
                className="text login_input"
                name="email"
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={handleChange}
              />

              <input
              className="text login_input"
                name="password"
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={handleChange}
              />
              <button className="btn_purple" type="submit">
                Login
              </button>
            </form>
            <div className="new_user">
              <p>New user?</p> <Link to="/sign-up">Sign up </Link>
            </div>
          </div>
        )}
        </LoginWrapper>
      </div>
    </Wrapper>
  );
};

export default Login;
