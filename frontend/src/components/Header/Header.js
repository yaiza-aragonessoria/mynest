import {  NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useStore} from "react-redux";
import {useEffect, useState} from "react";
import {clearAuth, setAuth} from "../../features/slices/authSlice";
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authData = localStorage.getItem('access');

    useEffect(() => {
      if(authData) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      }, [authData]);

    const handleLogout = () => {
      localStorage.removeItem('access');
      localStorage.removeItem('email');
      dispatch(clearAuth());
      setIsLoggedIn(false)
      navigate("/sign-in")
    };


  return (
    <>
      <div id='header'>
            <NavLink to="/">Logo</NavLink>
            <NavLink to="/expenses">Shared Expenses</NavLink>
            <NavLink to="/shoppinglist">Shopping List</NavLink>
            <NavLink to="/to-do">To Do</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          <div>
            <button type="button" id="signup" onClick={() => navigate("/sign-up")}>SIGNUP</button>
            {isLoggedIn ? <button type="button" id="logout" onClick={handleLogout}>LOGOUT</button> : <button type="button" id="login" onClick={() => navigate("/login")}>LOGIN</button> }
          </div>
      </div>
    </>
  );
};
export default Header;
