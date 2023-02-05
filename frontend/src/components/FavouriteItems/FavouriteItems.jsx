import React from "react";

const FavouriteItems = ({
  purchasedItems,
  setPurchasedItems,
  tobuyItem,
  setTobuyItem,
  updateCartStatus,
}) => {
  const handlePurchasedToBuy = (curItemId, curItemName) => {
    const found = tobuyItem.filter((item) => {
      return (
        item.id === curItemId ||
        item.name.toLowerCase() === curItemName.toLowerCase()
      );
    });
    if (found.length > 0) {
      return;
    }
    const updatedItems = [...tobuyItem];
    purchasedItems.map((item) => {
      if (item.id === curItemId) {
        console.log("hi");
        updatedItems.push({ ...item, in_cart: false });
      }
    });

    setTobuyItem(updatedItems);
    console.log(tobuyItem);
  };

  return (
    <div>
      {tobuyItem
        .filter((item) => {
          return item.status === "BO";
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
            </>
          );
        })}
    </div>
  );
};

export default FavouriteItems;
