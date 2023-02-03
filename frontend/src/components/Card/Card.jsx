import React from "react";

import {CardLayout} from "./Card.styled"

const Card = ({ foodDataItem, tobuyItem, setTobuyItem }) => {
  const handleAddItem = (curFoodDataItemId, curFoodDataItemName) => {
    const found = tobuyItem.filter((item) => {
      return (
        item.id === curFoodDataItemId ||
        item.name.toLowerCase() === curFoodDataItemName.toLowerCase()
      );
    });
    if (found.length > 0) {
      return;
    }

    setTobuyItem([
      ...tobuyItem,
      {
        id: Math.random() * 10000,
        name: curFoodDataItemName,
        in_cart: false,
        favorite: false,
        purchased: false,
      },
    ]);
  };

  return (
    <>
    <CardLayout>
      <h3>{foodDataItem.name}</h3>
      <span>{foodDataItem.description}</span>
      <button
        onClick={() => {
          handleAddItem(foodDataItem.id, foodDataItem.name);
          console.log(tobuyItem);
        }}
      >
        Add
      </button>
      <div className="card_image">{foodDataItem.image}</div>
      </CardLayout>
      
    </>
  );
};

export default Card;
