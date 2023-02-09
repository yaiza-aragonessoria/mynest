import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import FavouriteItems from "../../components/FavouriteItems/FavouriteItems";
import FavouriteItems_popup from "../../components/FavouriteItems/FavouriteItems_popup";
import InCart from "../../components/InCart/InCart";
import ShoppingList_item from "../../components/ShoppingList_item/ShoppingList_item";
import axios from "axios";

// STYLING
import {
  MainWrapper,
  InputContainer,
  ItemsContainer,
  FavoritesContainer
} from "./ShoppingList.styled";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faSort } from '@fortawesome/free-solid-svg-icons'
import MustLogIn from "../../components/MustLogIn/MustLogIn";
import {useDispatch, useSelector} from "react-redux";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import {fetchUser} from "../../features/slices/userSlice";



const Shoppinglist = () => {
 
  const dispatch = useDispatch();
  const token = localStorage.getItem("access");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useSelector(store => store.userProfile.userProfileSlice)

  useEffect(() => {
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);

    dispatch(fetchUser());

  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // TO BUY LIST
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const [tobuyItem, setTobuyItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const backendData = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/products/home/",
        config
      );

      setTobuyItem(backendData.data);
    };
    fetchData();
  }, []);

  const handleSubmitItem = (e) => {
    e.preventDefault();

    const found = tobuyItem.filter((item) => {
      return item.name.toLowerCase() === inputText.toLowerCase();
    });
    if (found.length > 0) {
      if (found[0].status === "TB" || found[0].status === "IP") {
        return;
      } else if (found[0].status === "BO") {
        updateCartStatus(found[0].id, "TB");
        setInputText("");
        return;
      }
    }
    axios
      .post(
        "https://mynest.propulsion-learn.ch/backend/api/products/home/",
        { name: inputText, favorite: false, status: "TB" },
        config
      )
      .then((result) => {
        setTobuyItem([...tobuyItem, result.data]);
      })
      .catch(() => {});

    setInputText("");
  };

  const [enableSort, setEnableSort] = useState(false);

  const updateCartStatus = (curItemId, newStatus) => {
    axios.patch(
      `https://mynest.propulsion-learn.ch/backend/api/products/${curItemId}/`,
      { status: newStatus },
      config
    );

    const updatedItems = tobuyItem.map((item) => {
      if (item.id !== curItemId) {
        return item;
      }
      return {
        ...item,
        status: newStatus,
      };
    });
    setTobuyItem(updatedItems);
  };

  const addToPurchased = (e) => {
    e.preventDefault();

    tobuyItem.map((item) => {
      if (item.status !== "BO") {
        axios.patch(
          `https://mynest.propulsion-learn.ch/backend/api/products/${item.id}/`,
          { status: "BO" },
          config
        );
      }
    });

    const updatedItems = tobuyItem.map((item) => {
      return {
        ...item,
        status: "BO",
      };
    });
    setTobuyItem(updatedItems);
  };

// HANDLING POPUP FOR RECENTLY PURCHASED
  const [showPopup, setShowPopup] = useState(false);
  const handlePopup = (e) => {
    setShowPopup(true);
  };


  return (
      <>
      {isLoggedIn ? userData?.home ?
              <MainWrapper>
                <FavouriteItems_popup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    tobuyItem={tobuyItem}
                    setTobuyItem={setTobuyItem}
                />

                <div className="left_main_container">
                  <InputContainer>
                    <form>
                      <input
                          className="text"
                          type="text"
                          placeholder="What do you need to buy?"
                          onChange={handleInputText}
                          value={inputText}
                      />
                      <button
                          className="btn_purple"
                          type="submit"
                          onClick={handleSubmitItem}
                          disabled={inputText.length < 1}
                      >
                        Add to list
                      </button>
                    </form>
                  </InputContainer>

                  <ItemsContainer>
                    <div className="to_buy_wrapper">
                      <div className="to_buy_header">
                        <h2 className="header">Things to Buy</h2>
                        <button
                            className="sort"
                            onClick={() => {
                              setEnableSort(!enableSort);
                            }}
                        >
                          <i>{<FontAwesomeIcon icon={faSort}/>}</i>
                        </button>
                      </div>

                      <ShoppingList_item
                          tobuyItem={tobuyItem}
                          enableSort={enableSort}
                          updateCartStatus={updateCartStatus}
                      />
                    </div>

                    <InCart tobuyItem={tobuyItem} updateCartStatus={updateCartStatus}/>
                  </ItemsContainer>

                  <button className="btn_grey empty_list_btn" onClick={addToPurchased}>
                    Empty the list
                  </button>

                  {/* <div className="send_email">
                      <input type="email" placeholder="Enter email" />
                      <button>Send list by email</button>
                    </div> */}
                </div>

                <div className="right_main_container">
                  <FavoritesContainer>
                    <div className="header_wrapper">
                      <h2 className="header">Recently purchased</h2>
                      <i onClick={handlePopup}>{<FontAwesomeIcon icon={faGears}/>}</i>
                    </div>

                    <FavouriteItems
                        tobuyItem={tobuyItem}
                        setTobuyItem={setTobuyItem}
                        updateCartStatus={updateCartStatus}
                        showPopup={showPopup}
                        setShowPopup={setShowPopup}
                    />
                  </FavoritesContainer>

                  <div className="cards_wraper">
                    <h2 className="header">Seasonal picks</h2>
                    <Cards
                        tobuyItem={tobuyItem}
                        setTobuyItem={setTobuyItem}
                        updateCartStatus={updateCartStatus}
                    />
                  </div>
                </div>
              </MainWrapper>
             : <MustHaveHome/> : <MustLogIn/>
      }
      </>
  );
};

export default Shoppinglist;
