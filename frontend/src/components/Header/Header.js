import {  NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useStore} from "react-redux";
import {useEffect, useState} from "react";
import {clearAuth, setAuth} from "../../features/slices/authSlice";

// STYLES
import logo_purple from "../../assets/logo_purple.png"
import { NavBar, Links, SigninSignup } from "./Header.styled";
import {cleanUserData} from "../../features/slices/userSlice";

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
      dispatch(cleanUserData());
      setIsLoggedIn(false)
      navigate("/login")
    };


  return (
    <>
      <NavBar>
        <div id="logo">
          <NavLink to="/">
            <img src={logo_purple} />
          </NavLink>
        </div>

        <Links className="text">
          <NavLink id="shared_expenses"
          to="/expenses">Shared Expenses</NavLink>

          <NavLink id="shopping_list" 
          to="/shoppinglist">Shopping List</NavLink>

          <NavLink id="to_do"
          to="/to-do">To Do</NavLink>

          <NavLink id="calendar"
          to="/calendar">Calendar</NavLink>

          <NavLink id="profile"
          to="/profile">Profile</NavLink>
        </Links>

        <SigninSignup>
          <button
            type="button"
            id="signup"
            onClick={() => navigate("/sign-up")}
          >
            SIGN UP
          </button>
          {isLoggedIn ? (
            <button type="button" id="logout" onClick={handleLogout}>
              LOG OUT
            </button>
          ) : (
            <button type="button" id="login" onClick={() => navigate("/login")}>
              LOG IN
            </button>
          )}
        </SigninSignup>
      </NavBar>
    </>
  );
};
export default Header;
