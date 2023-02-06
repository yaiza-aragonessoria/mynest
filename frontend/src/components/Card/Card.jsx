import React from "react";
import axios from "axios";

import { CardLayout } from "./Card.styled";

const Card = ({ foodDataItem, tobuyItem, setTobuyItem, updateCartStatus }) => {

  const token = localStorage.getItem("access");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleAddItem = (curFoodDataItemId, curFoodDataItemName) => {
    const found = tobuyItem.filter((item) => {
      return (
        item.name.toLowerCase() === curFoodDataItemName.toLowerCase()
      );
    });
    if (found.length > 0) {
      if (found[0].status === "TB" || found[0].status === "IP") {
        return;
      }
     
      if (found[0].status === "BO") {
        updateCartStatus(found[0].id, "TB")
      }

    } else {
      
    axios
    .post(
      "https://mynest.propulsion-learn.ch/backend/api/products/home/",
      { name: curFoodDataItemName, favorite: false, status: "TB" },
      config
    )
    .then((result) => {
      setTobuyItem([...tobuyItem, result.data]);
    })
    .catch(() => {}); }
  };

  return (
    <>
      <CardLayout>
        <h3>{foodDataItem.name}</h3>
        <span>{foodDataItem.description}</span>
        <button
          onClick={() => {
            handleAddItem(foodDataItem.id, foodDataItem.name);
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
