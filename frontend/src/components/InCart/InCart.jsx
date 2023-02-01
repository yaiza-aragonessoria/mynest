import React from "react";

const InCart = ({ tobuyItem, updateCartStatus }) => {
  return (
    <div>
      {tobuyItem
        .filter((item) => {
          return item.in_cart === true;
        })
        .map((item, index) => {
          return (
            <>
              <span
                onClick={() => {
                  updateCartStatus(item.id);
                }}
                key={item.id}
              >
                {item.name}
              </span>
            </>
          );
        })}
    </div>
  );
};

export default InCart;
