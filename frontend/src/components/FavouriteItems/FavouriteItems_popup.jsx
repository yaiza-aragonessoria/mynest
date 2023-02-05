import React from "react";
import axios from "axios";

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
    <div>
      <h3>Recently Purchased</h3>
      <div className="recently_purchased">
        <div>
          {tobuyItem
            .filter((item) => {
              return item.status === "BO" || item.favorite;
            })
            .map((item, index) => {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      handleLike(item.id, item.favorite);
                    }}
                    className="add_to_fav"
                  >
                    Like
                  </button>
                  <span className="item_name"> {item.name}</span>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="add_to_fav"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <button onClick={closePopup}>Close</button>
    </div>
  ) : (
    ""
  );
};

export default FavouriteItems_popup;
