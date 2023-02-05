import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import FavouriteItems from "../../components/FavouriteItems/FavouriteItems";
import InCart from "../../components/InCart/InCart";
import ShoppingList_item from "../../components/ShoppingList_item/ShoppingList_item";
import axios from "axios";

import { PageWrapper, MainWrapper } from "./ShoppingList.styled";

const Shoppinglist = () => {
  const token = localStorage.getItem("access");

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

  return (
    <PageWrapper>
      <div className="page_container">
        <div className="input_container">
          <form>
            <input
              type="text"
              placeholder="What do you need to buy?"
              onChange={handleInputText}
              value={inputText}
            />
            <button
              type="submit"
              onClick={handleSubmitItem}
              disabled={inputText.length < 1}
            >
              Add to list
            </button>
          </form>
        </div>

        <MainWrapper>
          <div className="left_main_container">
            <div className="to_buy_wrapper">
              <h2>Things to Buy</h2>
              <button
                onClick={() => {
                  setEnableSort(!enableSort);
                }}
              >
                Sort
              </button>
              <div className="to_buy_list">
                {/* RENDER TO BUY ITEMS HERE */}
                <ShoppingList_item
                  tobuyItem={tobuyItem}
                  enableSort={enableSort}
                  updateCartStatus={updateCartStatus}
                />
              </div>
            </div>

            <div className="in_cart_wrapper">
              <h2>Already in my cart</h2>
              <div className="in_cart_list">
                {/* RENDER ITEMS ALREADY IN CART */}
                <InCart
                  tobuyItem={tobuyItem}
                  updateCartStatus={updateCartStatus}
                />
              </div>
            </div>

            <button onClick={addToPurchased}>Empty the list</button>

            <div className="send_email">
              <input type="email" placeholder="Enter email" />
              <button>Send list by email</button>
            </div>
          </div>

          <div className="right_main_container">
            <div className="favourites_wraper">
              <h2>Recently purchased</h2>
              <FavouriteItems
                tobuyItem={tobuyItem}
                setTobuyItem={setTobuyItem}
                updateCartStatus={updateCartStatus}
              />

            </div>

            <div className="cards_wraper">
              <h2>Seasonal picks</h2>
              <Cards
                tobuyItem={tobuyItem}
                setTobuyItem={setTobuyItem}
                updateCartStatus={updateCartStatus}
              />
            </div>
          </div>
        </MainWrapper>
      </div>
    </PageWrapper>
  );
};

export default Shoppinglist;
