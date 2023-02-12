import { useNavigate } from "react-router-dom";
import {Avatar, PopupBg, PopupWrapper, Buttons} from "./EditUserProfile.styles";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {setAuth} from "../../features/slices/authSlice";
import {useSelector} from "react-redux";
import api from "../../api/myNest";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faUpload} from '@fortawesome/free-solid-svg-icons'


const EditUserProfile = (props) => {
  const userData = useSelector(state => state.userProfile.userProfileSlice);
  const [userHomeDetails, setUserHomeDetails] = useState({});
  const [modifiedUserData, setModifiedUserData] = useState({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      avatar: userData?.avatar,
      email: userData?.email,
  });
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

  useEffect( () => {
      /*Getting user's home details*/
      getUserHomeDetails().then(dataResponse => {
          setUserHomeDetails(dataResponse);
          console.log(userHomeDetails);
      } )

  }, [userData?.home])

  const toggleEdit = e => {
      e.preventDefault();
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

        console.log("modifiedUserData  in handle avatar=", modifiedUserData);
        setModifiedUserData(prevValue => {
            return {
                ...prevValue,
                [e.target.name]: e.target.files[0],
            };
        });
    } else {
        setModifiedUserData(prevValue => {
            return {
                ...prevValue,
                avatar: undefined,
            };
        });
    }
    console.log("modifiedUserData  in handle avatar=", modifiedUserData);
    }

  const handleSubmit = async event => {
      console.log(event)
    event.preventDefault();

    console.log("headers =", headers);
    console.log("modifiedUserData from handl submit" , modifiedUserData);

    /*We need a form to send the avatar to backend*/
    const formData = new FormData();

    for (const userField in modifiedUserData) {
        /*We change the undefined value of the avatar to a null value because of backend*/
        if (userField === 'avatar' && modifiedUserData[userField] === undefined || modifiedUserData[userField] === null) formData.append('avatar', '')
        else formData.append(userField, modifiedUserData[userField]);
    }

    console.log("formData =", Object.fromEntries(formData))

    try {
        const response = await api.patch("users/me/", formData, headers);
        setModifiedUserData(response.data);

    } catch (error) {
        setErrorMessage(error.message);
    }

    toggleEdit(event);
    // props.toggleEditProfile(event);
    // window.location.reload();
  }

  const makeURL = (src) => {
      /*In order to render the avatar, we need to create a URL when modifiedData.avatar is not yet a URL*/
      if (typeof src !== 'string') return URL.createObjectURL(src);
      else return src;
  }


  return (
    <PopupBg>
      <PopupWrapper>
        <h3 className="header">User Profile</h3>
        <form onSubmit={handleSubmit}>
                <Avatar>
                    {modifiedUserData?.avatar ? <img src={makeURL(modifiedUserData.avatar)}/> : <div className='no-avatar'>{modifiedUserData?.first_name ? modifiedUserData?.first_name[0] : modifiedUserData?.email[0]}</div>}
                    {isEditting && <div className='buttons-avatar'>
                                    <label htmlFor="avatar"><FontAwesomeIcon icon={faEdit}/></label>
                                    <input type="file"
                                           name="avatar"
                                           id="avatar"
                                           onChange={e => handleUploadAvatar(e)}
                                           accept="image/*"
                                    />
                                    <label onClick={e => handleUploadAvatar(e)}> <FontAwesomeIcon icon={faTrash}/></label>
                                </div> }
                </Avatar>
                    <div className='form-field'>
                        <label htmlFor='first_name'>First name</label>
                        {isEditting ? <input name="first_name" type="text" placeholder="First name"
                                             value={modifiedUserData.first_name} onChange={handleChange}/> :
                                        <input value={modifiedUserData?.first_name} disabled/>
                        }
                    </div>
                    <div className='form-field'>
                        <label htmlFor='last_name'>Last name</label>
                        {isEditting ? <input name="last_name" type="text" placeholder="Last name" value={modifiedUserData.last_name} onChange={handleChange}/> :
                            <input value={modifiedUserData?.last_name} disabled/>
                        }
                    </div>
                <div className='spanned form-field'>
                    <label htmlFor='email'>Email</label>
                    {isEditting ? <input name="email" type="email" placeholder="Email" value={modifiedUserData.email} onChange={handleChange}/> :
                                    <input value={modifiedUserData.email} type="email" disabled/>
                    }
                </div>
                <div className='form-field translated'>
                    <label>Your Nest</label>
                    {userHomeDetails ? <input value={userHomeDetails.name} disabled /> : <input value={"You haven't joined any Nest"} disabled />}
                </div>
                <div className='home-buttons'>
                {userHomeDetails ? <> <button className="btn_grey" onClick={e => e.preventDefault()}>Invite</button>
                                      <button className="btn_grey" onClick={e => e.preventDefault()}>Leave</button>
                                   </> :
                                    <> <button className="btn_grey" onClick={e => e.preventDefault()}>Join</button>
                                        <button className="btn_grey" onClick={e => e.preventDefault()}>Create</button>
                                    </>

                }
                </div>
                <Buttons>
                    {isEditting ? <button className="btn_purple" type="submit">Save</button> : <button className="btn_purple" onClick={e => toggleEdit(e)}>Edit</button>}
                    <button className="btn_purple" onClick={props.toggleEditProfile}>Close</button>
                </Buttons>
        </form>
        </PopupWrapper>
    </PopupBg>

  );
}

export default EditUserProfile