import React, { useState } from "react";
import FavouriteItems_popup from "./FavouriteItems_popup";

const FavouriteItems = ({ tobuyItem, updateCartStatus, setTobuyItem }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = (e) => {
    setShowPopup(true);
  };

  const sortFunction = (a, b) => {
    if ((a.favorite && b.favorite) || (!a.favorite && !b.favorite)) {
      // sorting by oldest (among favorites or among non-favorites)
      if (a.updated < b.updated) {
        return -1;
      } else if (a.updated > b.updated) {
        return 1;
      }

      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    } else {
      // sorting for favorite vs non-favorite
      if (a.favorite && !b.favorite) {
        return -1;
      } else {
        return 1;
      }
    }
  };

  return (
    <div>
      <div>
        {tobuyItem
          .filter((item) => {
            return item.status === "BO";
          })
          .slice()
          .sort(sortFunction)
          .map((item, index) => {
            return (
              <div key={item.id}>
                <span
                  onClick={() => {
                    updateCartStatus(item.id, "TB");
                  }}
                >
                  {item.name}
                </span>
                <br />
              </div>
            );
          })}
      </div>
      <button onClick={handlePopup}>Edit</button>
      <FavouriteItems_popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
      />
    </div>
  );
};

export default FavouriteItems;
