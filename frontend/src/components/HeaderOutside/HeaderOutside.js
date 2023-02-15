import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuth, setAuth } from "../../features/slices/authSlice";
import {useSelector} from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';

// STYLES
import logo_purple from "../../assets/logo_purple.png";
import { NavBar, Links, SigninSignup, AvatarUser } from "./HeaderOutside.styled";
import { cleanUserData } from "../../features/slices/userSlice";
import EditUserProfile from "../EditUserProfile/EditUserProfile";

const HeaderOutside = () => {
  const userData = useSelector(state => state.userProfile.userProfileSlice);
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
  };


  return (
    <>
      {/*{inEditUserProfile && <EditUserProfile toggleEditProfile={toggleEditProfile} />}*/}
      <NavBar>
        <div id="logo">
          <NavLink to="/">
            <img src={logo_purple} />
          </NavLink>
        </div>

        <Links className="text">
        <Link to="/#info_laptop">
              Why MyNest?
          </Link>

          <Link to="/#about">
              About product
          </Link>

          <Link to="/#how">
            Solutions
          </Link>
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

export default HeaderOutside;
