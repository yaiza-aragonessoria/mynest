import React, { useState } from "react";
import FavouriteItems_popup from "./FavouriteItems_popup";

const FavouriteItems = ({ tobuyItem, updateCartStatus, setTobuyItem }) => {

const [showPopup, setShowPopup] = useState(false);

const handlePopup = (e) => {
  setShowPopup(true); 
}

  return (
    <div>
      <div>
        {tobuyItem
          .filter((item) => {
            return item.status === "BO";
          })
          .map((item, index) => {
            return (
              <span
                onClick={() => {
                  updateCartStatus(item.id, "TB");
                }}
                key={item.id}
              >
                {item.name}
              </span>
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
