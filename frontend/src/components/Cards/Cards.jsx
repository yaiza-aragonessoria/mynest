import React from "react";
import { food_data } from "../../constants/food_data";
import Card from "../Card/Card";

const Cards = ({ tobuyItem, setTobuyItem }) => {
  console.log(Math.floor(2 * Math.random()));
  const indexes = [];
  while (indexes.length < 3) {
    const index = Number(Math.floor(food_data.length * Math.random()));
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }
  console.log(indexes);
  return (
    <div>
      <Card
        foodDataItem={food_data[indexes[0]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
      />
      <Card
        foodDataItem={food_data[indexes[1]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
      />
      <Card
        foodDataItem={food_data[indexes[2]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
      />
    </div>
  );
};

export default Cards;
