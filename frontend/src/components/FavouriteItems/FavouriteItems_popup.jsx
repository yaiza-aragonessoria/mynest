import React from "react";
import axios from "axios";

// STYLES
import { PopupWrapper } from "./FavouriteItems_popup.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const FavouriteItems_popup = ({
  showPopup,
  setShowPopup,
  tobuyItem,
  setTobuyItem,
}) => {
  const token = localStorage.getItem("access");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const closePopup = (e) => {
    setShowPopup(false);
  };

  const handleLike = (curItemId, curFavoriteState) => {
    axios
      .patch(
        `https://mynest.propulsion-learn.ch/backend/api/products/${curItemId}/`,
        { favorite: !curFavoriteState },
        config
      )
      .then((result) => {
        const updatedItems = [];
        tobuyItem.map((item) => {
          if (item.id === result.data.id) {
            updatedItems.push(result.data);
          } else {
            updatedItems.push(item);
          }
        });
        setTobuyItem(updatedItems);
      });
  };

  const handleDelete = (curItemId) => {
    axios
      .delete(
        `https://mynest.propulsion-learn.ch/backend/api/products/${curItemId}/`,
        config
      )
      .then(() => {
        const updatedItems = [];
        tobuyItem.map((item) => {
          if (item.id !== curItemId) {
            updatedItems.push(item);
          }
        });
        setTobuyItem(updatedItems);
      });
  };

  return showPopup ? (
    <PopupWrapper>
      <h3 className="header">Edit recently purchased items</h3>
      <div className="purchased_items_container">
        {tobuyItem
          .filter((item) => {
            return item.status === "BO" || item.favorite;
          })
          .map((item, index) => {
            return (
              <div className="purchased_item text" key={item.id}>
                <i
                  className="add_to_fav"
                  onClick={() => {
                    handleLike(item.id, item.favorite);
                  }}
                >
                  {<FontAwesomeIcon icon={faStar} />}
                </i>

                <span className="item_name"> {item.name}</span>

                <i
                  className="delete_item"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  {<FontAwesomeIcon icon={faTrash} />}
                </i>
              </div>
            );
          })}
      </div>
      <button onClick={closePopup} className="btn_grey">
        Close
      </button>
    </PopupWrapper>
  ) : (
    ""
  );
};

export default FavouriteItems_popup;
