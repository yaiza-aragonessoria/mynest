import React from "react";

const FavouriteItems = ({
  purchasedItems,
  setPurchasedItems,
  tobuyItem,
  setTobuyItem,
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
      {purchasedItems
        .filter((item) => {
          return item.purchased === true;
        })
        .map((item, index) => {
          return (
            <>
              <span
                onClick={() => {
                  handlePurchasedToBuy(item.id, item.name);
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
