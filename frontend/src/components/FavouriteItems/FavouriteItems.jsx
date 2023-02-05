import React from "react";

const FavouriteItems = ({ tobuyItem, updateCartStatus }) => {
  return (
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
  );
};

export default FavouriteItems;
