import React, { useEffect, useState } from "react";
import axios from "axios";
import Sticker from "../../components/Sticker/Sticker";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import { HomeWrapper, HomeDetails, StickersContainer } from "./Home.styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/slices/userSlice";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMapPin } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useSelector((store) => store.userProfile.userProfileSlice);
  const userLoaded = useSelector((state) => state.userProfile.loaded);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [homeName, setHomeName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [homeUsers, setHomeUsers] = useState([]);
  const [homeStickers, setHomeStickers] = useState([]);
  const [newStickerContent, setNewStickerContent] = useState("");
  const [warning, setWarning] = useState("");

  const toggleSticker = (id) => {
    let newStickers = homeStickers.map((s) =>
      s.id == id ? { ...s, pinned: !s.pinned } : s
    );
    setHomeStickers(newStickers);
  };
  const deleteSticker = (id) => {
    setHomeStickers(homeStickers.filter((s) => s.id != id));
  };

  const compareStickers = (a, b) => {
    if (a.pinned && b.pinned) {
      return b.id - a.id;
    } else if (a.pinned) {
      return -1;
    } else if (b.pinned) {
      return 1;
    } else {
      return b.id - a.id;
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");

    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("fetchdata");
      let backendData = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/home/",
        config
      );
      // console.log(backendData);
      setHomeName(backendData.data.name);
      setHomeAddress(backendData.data.address);
      backendData = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/users/home/",
        config
      );
      // console.log(backendData);
      setHomeUsers(backendData.data);
      backendData = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/stickers/home/",
        config
      );
      // console.log(backendData);
      setHomeStickers(backendData.data);
    };
    fetchData();
  }, []);

  const handleNewStickerContentChange = (e) => {
    setNewStickerContent(e.target.value);
  };

  const handleCreateNewSticker = (e) => {
    e.preventDefault();

    setWarning("");
    axios
      .post(
        "https://mynest.propulsion-learn.ch/backend/api/stickers/home/",
        {
          content: newStickerContent,
        },
        config
      )
      .then((result) => {
        setNewStickerContent("");
        setHomeStickers([...homeStickers, result.data]);
      })
      .catch((error) => {
        // set warning
        setWarning(error.message);
      });
  };

  return (
    <>
      {userLoaded ? (
        userData?.home ? (
          <HomeWrapper>
            <div className="content_wrapper">
              <HomeDetails>
                <div className="home_header">
                  <div className="home_header_container">
                    <i id="home_house_icon">
                      {<FontAwesomeIcon icon={faHouse} />}
                    </i>
                    <h1 className="header">{homeName}</h1>
                  </div>

                  <div className="home_header_container home_address">
                    <i>{<FontAwesomeIcon icon={faMapPin} />}</i>
                    <p>{homeAddress}</p>
                  </div>
                </div>

                <div className="home-members">
                  <h2 className="subheader">Nest's participants</h2>

                  <div className="home-members-icons">
                    {homeUsers.map((u) => (
                      <div className="member" key={u.id}>
                        <img src={u.avatar} />
                        <span className="text">{u.first_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </HomeDetails>

              <StickersContainer>
                <div className="row_1">
                  <div className="input_form">
                    <form className="sticker-bar">
                      <textarea
                        type="text"
                        placeholder="Leave a message..."
                        value={newStickerContent}
                        onChange={handleNewStickerContentChange}
                      />
                      <button
                        className="btn_purple add_sticker"
                        type="submit"
                        onClick={handleCreateNewSticker}
                      >
                        Add Sticker
                      </button>
                    </form>
                    <div>{warning}</div>
                  </div>



{/* rendering post in two divs depending on its index */}
                {/* {postData.map((post, index) => {
                return (index % 2 == 0) && <Post key={post.id} post={post} />;
                })}

                {postData.map((post, index) => {
                return (index % 2 != 0) && <Post key={post.id} post={post} />;
                })} */}

                  {/* RENDERING STICKERS ROW 1 HERE     */}

                  {homeStickers.sort(compareStickers).map((s, id) => {
                    return (id % 3 === 0) && 
                    <Sticker
                      key={s.id}
                      sticker={s}
                      toggleSticker={toggleSticker}
                      deleteSticker={deleteSticker}
                    />})}


                </div>



                <div className="row_2">
                  {/* RENDERING STICKERS ROW 2 HERE     */}

                  {/* {homeStickers.sort(compareStickers).map((s) => (
                    <Sticker
                      key={s.id}
                      sticker={s}
                      toggleSticker={toggleSticker}
                      deleteSticker={deleteSticker}
                    />
                  ))} */}
                  {homeStickers.sort(compareStickers).map((s, id) => {
                    return (id % 3 === 1) && 
                    <Sticker
                      key={s.id}
                      sticker={s}
                      toggleSticker={toggleSticker}
                      deleteSticker={deleteSticker}
                    />})}
                </div>



                <div className="row_3">
                  {/* RENDERING STICKERS ROW 3 HERE     */}

                  {homeStickers.sort(compareStickers).map((s, id) => {
                    return (id % 3 === 2) && 
                    <Sticker
                      key={s.id}
                      sticker={s}
                      toggleSticker={toggleSticker}
                      deleteSticker={deleteSticker}
                    />})}



                </div>

                

                {/* <div className="sticker-board">
                  {homeStickers.sort(compareStickers).map((s) => (
                    <Sticker
                      key={s.id}
                      sticker={s}
                      toggleSticker={toggleSticker}
                      deleteSticker={deleteSticker}
                    />
                  ))}
                </div> */}
              </StickersContainer>
            </div>
          </HomeWrapper>
        ) : (
          <MustHaveHome />
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
