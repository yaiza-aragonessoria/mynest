import React from "react";

import { CardLayout } from "./Card.styled";

const Card = ({ foodDataItem, tobuyItem, setTobuyItem }) => {
  const handleAddItem = (curFoodDataItemId, curFoodDataItemName) => {
    const found = tobuyItem.filter((item) => {
      return (
        item.id === curFoodDataItemId ||
        item.name.toLowerCase() === curFoodDataItemName.toLowerCase()
      );
    });
    if (found.length > 0) {
      if (found[0].status === "TB") {
        return;
      }
    }

    const updatedItems =
      found.length > 0
        ? tobuyItem.filter((item) => item.id !== found[0].id)
        : tobuyItem.slice();

    setTobuyItem([
      ...updatedItems,
      {
        id: found.length > 0 ? found[0].id : Math.random() * 10000,
        name: curFoodDataItemName,
        favorite: false,
        status: "TB",
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
