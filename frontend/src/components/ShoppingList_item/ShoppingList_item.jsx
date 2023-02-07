import React from "react";

// STYLING
import { ItemWrapper } from "./ShoppingList_item.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

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
    <ItemWrapper>
      {(enableSort ? tobuyItem.slice().sort(sortFunction) : tobuyItem)
        .filter((item) => {
          return item.status === "TB";
        })
        .map((item, index) => {
          return (
            <div className="to_buy_item text" key={item.id}>
              <i
                className="check"
                onClick={() => {
                  updateCartStatus(item.id, "IP");
                }}
              >
                {<FontAwesomeIcon icon={faCheck} />}
              </i>
              
              <p
                onClick={() => {
                  updateCartStatus(item.id, "IP");
                }}
              >
                {item.name}
              </p>

              <i
                className="delete_from_list"
                onClick={() => updateCartStatus(item.id, "BO")}
              >
                {<FontAwesomeIcon icon={faXmark} />}
              </i>
            </div>
          );
        })}
    </ItemWrapper>
  );
};

export default ShoppingList_item;
