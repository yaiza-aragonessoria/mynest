import React from "react";

const ShoppingList_item = ({ tobuyItem, enableSort, updateCartStatus }) => {
  const sortFunction = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="to_buy_item">
      {(enableSort ? tobuyItem.slice().sort(sortFunction) : tobuyItem)
        .filter((item) => {
          return item.status === "TB";
        })
        .map((item, index) => {
          return (
            <div key={item.id}>
              <span
                onClick={() => {
                  updateCartStatus(item.id, "IP");
                }}
              >
                {item.name}
              </span>
              <button onClick={() => updateCartStatus(item.id, "BO")}>
                Delete item
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default ShoppingList_item;
