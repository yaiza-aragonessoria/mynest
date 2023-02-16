import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {clearAuth, setAuth} from "../../features/slices/authSlice";
import {useSelector} from "react-redux";

// STYLES
import logo_purple from "../../assets/logo_purple.png";
import {SigninSignup, AvatarUser, Wrapper} from "./HeaderResponsive.styled";
import {cleanUserData} from "../../features/slices/userSlice";


const HeaderResponsive = () => {
    const userData = useSelector(state => state.userProfile.userProfileSlice);
    console.log(userData.avatar);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authData = localStorage.getItem("access");
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    console.log(windowSize)

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
            <Wrapper>
                <section className="top-nav">
                    <div id='logo'>
                        <NavLink to="/">
                            <img src={logo_purple}/>
                        </NavLink>
                    </div>
                    <input id="menu-toggle" type="checkbox"/>
                    <label className='menu-button-container' htmlFor="menu-toggle">
                        <div className='menu-button'></div>
                    </label>
                    <ul className="menu">
                        <li>
                            {windowSize >=841 && windowSize <=1041 ? <a class="active" href="/shoppinglist">Shopping</a> :
                                <a className="active" href="/shoppinglist">Shopping List</a>}
                        </li>
                        <li>{windowSize >=841 && windowSize <=1041 ? <a className="active" href="/expenses">Expenses</a> : <a className="active" href="/expenses">Shared Expenses</a>}</li>
                        <li><a className="active" href="/to-do">Tasks</a></li>
                        <li><a className="active " href="/calendar">Calendar</a></li>

                        {isLoggedIn && <li id='avatar-profile'> {isLoggedIn && windowSize >= 841 ? (
                            <div className='avatar-profile'>
                                <AvatarUser onClick={() => navigate("/user-profile")} src={userData.avatar}/></div>
                        ) : <a className="active" href="/user-profile">Profile</a>}</li>}
                        <li>
                            <SigninSignup className='log-buttons'>
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
                        </li>

                    </ul>

                </section>
            </Wrapper>
        </>
    );
};
export default HeaderResponsive;
