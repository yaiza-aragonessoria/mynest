import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setAuth} from "../../features/slices/authSlice";


const Login = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newWarning, setNewWarning] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.data);

  const handleChange = e => {
    if(e.target.name === "email") {
      setNewEmail(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: newEmail,
      password: newPassword,
    };
    axios.post("https://mynest.propulsion-learn.ch/backend/api/auth/token/", data).then(res => {
      setNewWarning("");
      const authData = {
        email: newEmail,
        access: res.data.access,

      }

      localStorage.setItem('access', authData.access);
      localStorage.setItem('email', authData.email);

      dispatch(setAuth(authData));

    }).catch(error => {
      setNewWarning(error.message);
    });
  }

  useEffect(() => {
    if(auth) {
      navigate("/");
    }

    const authData = {
      email: localStorage.getItem('email'),
      access: localStorage.getItem('access'),

    };

    if(authData.access) {
      dispatch(setAuth(authData));
    }

  });

  return (
    <>
      <h2>Login</h2>
        <hr></hr>

      <p>{newWarning}</p>

      {!auth && <form onSubmit={handleSubmit}>
                <span>
                  <input name="email" type="email" placeholder="Email" value={newEmail} onChange={handleChange}/>
                </span>
                <span>
                  <input name="password" type="password" placeholder="Password" value={newPassword} onChange={handleChange}/>
                </span>
                <button type="submit">Login</button>
              </form>
      }
    </>

  );
}

export default Login