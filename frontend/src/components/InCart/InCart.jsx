import React from "react";

const InCart = ({ tobuyItem, updateCartStatus }) => {
  return (
    <div>
      {tobuyItem
        .filter((item) => {
          return item.status === "IP";
        })
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
              <button onClick={() => updateCartStatus(item.id, "BO")}>
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default InCart;
