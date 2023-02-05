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
            <>
              <span
                onClick={() => {
                  updateCartStatus(item.id, "TB");
                }}
                key={item.id}
              >
                {item.name}
              </span>
              <button onClick={() => updateCartStatus(item.id, "BO")}>
                Delete
              </button>
            </>
          );
        })}
    </div>
  );
};

export default InCart;
