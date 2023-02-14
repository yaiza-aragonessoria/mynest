import {Avatar, Wrapper, Buttons, SignupWrapper, Vjosa} from "./UserProfile.styles";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/myNest";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import Loading from "../../components/Loading/Loading";
import {fetchUser} from "../../features/slices/userSlice";
import {useNavigate} from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userProfile.userProfileSlice);
    const userLoaded = useSelector(state => state.userProfile.loaded);
    console.log("userData ", userData)
    console.log("userLoaded ", userLoaded)
    const [userHomeDetails, setUserHomeDetails] = useState({});
    const [modifiedUserData, setModifiedUserData] = useState({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        avatar: userData?.avatar,
        email: userData?.email,
    });
    console.log("modifiedUserData ", modifiedUserData)

    const access = localStorage.getItem("access");
    const headers = {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    }
    const [isEditting, setIsEditting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getUserHomeDetails = async () => {
        try {
            const response = await api.get('home/', headers);
            return response.data;
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (!access) navigate("/login");

        dispatch(fetchUser());
        console.log("fetched sent")

        setModifiedUserData({
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            avatar: userData?.avatar,
            email: userData?.email,
        });
    }, []);

    useEffect(() => {
        /*Getting user's home details*/
        getUserHomeDetails().then(dataResponse => {
            setUserHomeDetails(dataResponse);
            console.log("userHomeDetails =", userHomeDetails);
        })

    }, [userData?.home])

    const toggleEdit = e => {
        e.preventDefault();
        if (isEditting === false) setModifiedUserData({
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            avatar: userData?.avatar,
            email: userData?.email,
        });
        setIsEditting(!isEditting);

    }

    const handleChange = (e) => {
        console.log("modifiedUserData in handle on change =", modifiedUserData);
        setModifiedUserData({...modifiedUserData, [e.target.name]: e.target.value})
        console.log("modifiedUserData =", modifiedUserData);
    }

    const handleUploadAvatar = e => {
        console.log("e =", e.target.files);

        console.log("e.target.files !== undefined =", e.target.files !== undefined);

        if (e.target.files !== undefined) {
            console.log("true")

            console.log("modifiedUserData  in handle avatar=", modifiedUserData);
            setModifiedUserData(prevValue => {
                return {
                    ...prevValue,
                    [e.target.name]: e.target.files[0],
                };
            });
            console.log("modifiedUserData ", modifiedUserData)

        } else {
            console.log("false")
            console.log("modifiedUserData ", modifiedUserData)

            setModifiedUserData(prevValue => {
                return {
                    ...prevValue,
                    avatar: undefined,
                };
            });

            console.log("modifiedUserData ", modifiedUserData)

        }
        console.log("modifiedUserData  in handle avatar=", modifiedUserData);
    }

    const handleSubmit = async event => {
        console.log(event)
        event.preventDefault();

        console.log("headers =", headers);
        console.log("modifiedUserData from handl submit", modifiedUserData);

        /*We need a form to send the avatar to backend*/
        const formData = new FormData();

        for (const userField in modifiedUserData) {
            /*We change the undefined value of the avatar to a null value because of backend*/
            // if (userField === 'avatar' && modifiedUserData[userField] === undefined || modifiedUserData[userField] === null) formData.append('avatar', '')
            console.log("typeof modifiedUserData[userField] === 'File'", modifiedUserData[userField] instanceof File)
            if (userField === 'avatar' && !(modifiedUserData[userField] instanceof File)) {
                if (modifiedUserData[userField] === undefined || modifiedUserData[userField] === null) formData.append('avatar', '');
                else continue;
            } else formData.append(userField, modifiedUserData[userField]);
        }

        console.log("formData =", Object.fromEntries(formData))

        try {
            const response = await api.patch("users/me/", formData, headers);
            setModifiedUserData(response.data);

        } catch (error) {
            setErrorMessage(error.message);
        }

        toggleEdit(event);
        // toggleEditProfile(event);
        window.location.reload();
    }

    const makeURL = (src) => {
        /*In order to render the avatar, we need to create a URL when modifiedData.avatar is not yet a URL*/
        if (typeof src !== 'string') return URL.createObjectURL(src);
        else return src;
    }


    return (
        <>
            {userLoaded ? userData?.home ?
                <SignupWrapper>
                    <div className="image_starter_page">
                        {/* RENDERING THE BG IMAGE FROM PUBLIC FOLDER */}
                    </div>
                    <Wrapper>
                        <Vjosa>
                            <div className='test'>
                            <form onSubmit={handleSubmit}>
                                <h3 className="header">User Profile</h3>
                                {/*{isEditting ?*/}
                                {/*    <div className='save-edit-cancel'>*/}
                                {/*        <button className='icon-button' onClick={e => toggleEdit(e)} htmlFor="avatar">*/}
                                {/*            <FontAwesomeIcon icon={faXmark}/></button>*/}
                                {/*        <button className='icon-button' type="submit" htmlFor="avatar"><FontAwesomeIcon*/}
                                {/*            icon={faCheck}/></button>*/}
                                {/*    </div>*/}
                                {/*    : <button className='icon-button' onClick={e => toggleEdit(e)} htmlFor="avatar">*/}
                                {/*        <FontAwesomeIcon icon={faEdit}/></button>}*/}
                                <div className='sara'>
                                    <div className='nila'>
                                        <Avatar>
                                            {isEditting ? (modifiedUserData.avatar ?
                                                    <img src={makeURL(modifiedUserData.avatar)}/> :
                                                    <div
                                                        className='no-avatar'>{modifiedUserData?.first_name ? modifiedUserData?.first_name[0] : modifiedUserData?.email[0]}</div>) :
                                                (userData.avatar ? <img src={makeURL(userData.avatar)}/> :
                                                    <div
                                                        className='no-avatar'>{userData?.first_name ? userData?.first_name[0] : userData?.email[0]}</div>)}

                                            {isEditting && <div className='buttons-avatar'>
                                                <label htmlFor="avatar"><FontAwesomeIcon icon={faEdit}/></label>
                                                <input type="file"
                                                       name="avatar"
                                                       id="avatar"
                                                       onChange={e => handleUploadAvatar(e)}
                                                       accept="image/*"
                                                />
                                                <label onClick={e => handleUploadAvatar(e)}> <FontAwesomeIcon
                                                    icon={faTrash}/></label>
                                            </div>}
                                        </Avatar>
                                    </div>
                                    <div className='nina'>
                                        {isEditting &&
                                            <Buttons>
                                                <button className="btn_purple" type="submit">Save</button>
                                            </Buttons>
                                        }
                                        {isEditting &&
                                            <Buttons>
                                                <button className="btn_purple" onClick={toggleEdit}>Cancel</button>
                                            </Buttons>
                                        }

                                        {!isEditting &&
                                            <Buttons>

                                                <button className="btn_purple" onClick={toggleEdit}>Edit</button>
                                            </Buttons>}


                                    </div>
                                </div>
                                <div className='form-field'>
                                    {/*<div className='vjosa'>*/}
                                    {/*    <div className='nina'>*/}
                                    <label htmlFor='first_name'>First name</label>
                                    {isEditting ? <input name="first_name" type="text" placeholder="First name"
                                                         value={modifiedUserData.first_name}
                                                         onChange={handleChange}/> :
                                        <input value={userData?.first_name} disabled/>
                                    }
                                </div>
                                {/*<div className='nina'>*/}
                                {/*    <label htmlFor='last_name'>Last name</label>*/}
                                {/*    {isEditting ? <input name="last_name" type="text" placeholder="Last name"*/}
                                {/*                         value={modifiedUserData.last_name}*/}
                                {/*                         onChange={handleChange}/> :*/}
                                {/*        <input value={userData?.last_name} disabled/>*/}
                                {/*    }*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                <div className='form-field'>
                                    <label htmlFor='last_name'>Last name</label>
                                    {isEditting ? <input name="last_name" type="text" placeholder="Last name"
                                                         value={modifiedUserData.last_name} onChange={handleChange}/> :
                                        <input value={userData?.last_name} disabled/>
                                    }
                                </div>
                                <div className='spanned form-field'>
                                    <label htmlFor='email'>Email</label>
                                    {isEditting ?
                                        <input name="email" type="email" placeholder="Email"
                                               value={modifiedUserData.email}
                                               onChange={handleChange}/> :
                                        <input value={userData.email} type="email" disabled/>
                                    }
                                </div>
                                <div className='form-field translated'>
                                    <label>Your Nest</label>
                                    {userHomeDetails ? <input value={userHomeDetails.name} disabled/> :
                                        <input value={"You haven't joined any Nest"} disabled/>}
                                </div>
                                <div className='home-buttons'>
                                    {userHomeDetails ? <>
                                            <button className="btn_grey" onClick={e => e.preventDefault()}>Invite</button>
                                            <button className="btn_grey" onClick={e => e.preventDefault()}>Leave</button>
                                        </> :
                                        <>
                                            <button className="btn_grey" onClick={e => e.preventDefault()}>Join</button>
                                            <button className="btn_grey" onClick={e => e.preventDefault()}>Create
                                            </button>
                                        </>

                                    }
                                </div>

                            </form>
                                </div>
                        </Vjosa>
                    </Wrapper>
                </SignupWrapper>
                : <MustHaveHome/> : <Loading/>
            }
        </>
    );
};

export default UserProfile