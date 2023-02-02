import React, { useState } from "react";
import InCart from "../../components/InCart/InCart";
import ShoppingList_item from "../../components/ShoppingList_item/ShoppingList_item";

import { PageWrapper, MainWrapper } from "./ShoppingList.styled";

const Shoppinglist = () => {
  // TO BUY LIST
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const [tobuyItem, setTobuyItem] = useState([]);

  const handleSubmitItem = (e) => {
    e.preventDefault();
    setTobuyItem([
      ...tobuyItem,
      {
        id: Math.random() * 10000,
        name: inputText,
        in_cart: false,
        favorite: false,
        purchased: false,
      },
    ]);
    setInputText("");
  };

  const [enableSort, setEnableSort] = useState(false);

  const updateCartStatus = (curItemId) => {
    const updatedItems = tobuyItem.map((item) => {
      if (item.id !== curItemId) {
        return item;
      }
      return {
        // id: item.id,
        // name: item.name,
        ...item,
        in_cart: !item.in_cart,
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
                  setTobuyItem={setTobuyItem}
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

            <button>Done with shopping</button>

            <div className="send_email">
              <input type="email" placeholder="Enter email" />
              <button>Send list by email</button>
            </div>
          </div>

          <div className="right_main_container">
            <div className="favourites_wraper">
              <h2>Favourites</h2>
              <p>item 1</p>
              <p>item 2</p>
              <p>item 3</p>
              <button>Edit Favourites</button>
            </div>

            <div className="cards_wraper">
              <h2>Seasonal picks</h2>
              <div className="card">
                <img />
                <h3>Item name</h3>
                <span>Description</span>
                <button>Add to my list</button>
              </div>
              <div className="card">
                <img />
                <h3>Item name</h3>
                <span>Description</span>
                <button>Add to my list</button>
              </div>
              <div className="card">
                <img />
                <h3>Item name</h3>
                <span>Description</span>
                <button>Add to my list</button>
              </div>
            </div>
          </div>
        </MainWrapper>
      </div>
    </PageWrapper>
  );
};

export default Shoppinglist;