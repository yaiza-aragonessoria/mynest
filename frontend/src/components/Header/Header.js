import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuth, setAuth } from "../../features/slices/authSlice";
import {useSelector} from "react-redux";

// STYLES
import logo_purple from "../../assets/logo_purple.png";
import { NavBar, Links, SigninSignup, AvatarUser } from "./Header.styled";
import { cleanUserData } from "../../features/slices/userSlice";

const Header = () => {
  const userData = useSelector(state => state.userProfile.userProfileSlice);
  console.log(userData.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authData = localStorage.getItem("access");
  const [inEditUserProfile, setInEditUserProfile] = useState(false);

  useEffect(() => {
    if (authData) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [authData]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("email");
    dispatch(clearAuth());
    dispatch(cleanUserData());
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  };


  return (
    <>
      <NavBar>
        <div id="logo">
          <NavLink to="/dashboard">
            <img src={logo_purple} />
          </NavLink>
        </div>

        <Links className="text">
        <NavLink id="shopping_list" to="/shoppinglist">
            Shopping List
          </NavLink>
          <NavLink id="shared_expenses" to="/expenses">
            Shared Expenses
          </NavLink>
          <NavLink id="to_do" to="/to-do">
            TASKS
          </NavLink>
          <NavLink id="calendar" to="/calendar">
            Calendar
          </NavLink>
          {!isLoggedIn && (
            <NavLink id="user-profile" to="/user-profile">
              Profile
            </NavLink>
          )}
         {isLoggedIn && (
          
          <AvatarUser onClick={() => navigate("/user-profile") } src={userData.avatar}  />
        )}
       </Links>

      <SigninSignup>
        {!isLoggedIn && (
          <button type="button" id="signup" onClick={() => navigate("/sign-up")}>
            SIGN UP
          </button>
        )}
        {isLoggedIn ? (
          <button
            type="button"
            id="logout"
            className="logout"
            onClick={handleLogout}
          >
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
