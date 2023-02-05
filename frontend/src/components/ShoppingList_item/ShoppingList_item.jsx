import React from "react";

const ShoppingList_item = ({
  tobuyItem,
  setTobuyItem,
  enableSort,
  updateCartStatus,
}) => {
  const handleDeleteItem = (id) => {
    const newItems = tobuyItem.filter((l) => l.id !== id);
    setTobuyItem(newItems);
  };

  const sortFunction = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  // const updateCartStatus = (curItemId) => {
  //   const updatedItems = tobuyItem.map((item) => {
  //     if (item.id !== curItemId) {
  //       return item;
  //     }
  //     return {
  //       // id: item.id,
  //       // name: item.name,
  //       ...item,
  //       in_cart: !item.in_cart,
  //     };
  //   });
  //   setTobuyItem(updatedItems);
  // };

  return (
    <div className="to_buy_item">
      {(enableSort ? tobuyItem.slice().sort(sortFunction) : tobuyItem)
        .filter((item) => {
          return item.status === "TB";
        })
        .map((item, index) => {
          return (
            <>
              <span
                onClick={() => {
                  updateCartStatus(item.id, "IP");
                }}
                key={item.id}
              >
                {item.name}
              </span>
              <button onClick={() => updateCartStatus(item.id, "BO")}>
                Delete item
              </button>
            </>
          );
        })}
    </div>
  );
};

export default ShoppingList_item;
