import React from "react";

const ShoppingList_item = ({ tobuyItem, setTobuyItem, enableSort }) => {

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


  return (
    <div className="to_buy_item">
      {/* SORTING ITEMS */}
      {(enableSort ? tobuyItem.slice().sort(sortFunction) : tobuyItem).map(
        (item, index) => {
          return (
            <>
              <span key={item.id}>{item.name}</span>
              <button onClick={() => handleDeleteItem(item.id)}>
                Delete item
              </button>
            </>
          );
        }
      )}
    </div>
  );
};

export default ShoppingList_item;
