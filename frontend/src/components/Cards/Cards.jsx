import React, {useState} from "react";
import { food_data } from "../../constants/food_data";
import Card from "../Card/Card";

const Cards = ({ tobuyItem, setTobuyItem, updateCartStatus }) => {

  const [indexes, setIndexes] = useState(() => {
    const indexesPrep = [];
    while (indexesPrep.length < 3) {
      const index = Number(Math.floor(food_data.length * Math.random()));
      if (!indexesPrep.includes(index)) {
        indexesPrep.push(index);
      }
    }
    return indexesPrep;
  });

  return (
    <div>
      <Card
        foodDataItem={food_data[indexes[0]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
        updateCartStatus={updateCartStatus}
      />
      <Card
        foodDataItem={food_data[indexes[1]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
        updateCartStatus={updateCartStatus}
      />
      <Card
        foodDataItem={food_data[indexes[2]]}
        tobuyItem={tobuyItem}
        setTobuyItem={setTobuyItem}
        updateCartStatus={updateCartStatus}
      />
    </div>
  );
};

export default Cards;
