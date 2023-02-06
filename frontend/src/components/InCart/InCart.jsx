import React from "react";

// STYLING
import { InCartWrapper } from "./InCart.styled";
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const InCart = ({ tobuyItem, updateCartStatus }) => {
  return (
    <InCartWrapper>
      {tobuyItem
        .filter((item) => {
          return item.status === "IP";
        })
        .map((item, index) => {
          return (
            <div className="in_cart_item text" key={item.id}>
              <i
                className="check"
                onClick={() => {
                  updateCartStatus(item.id, "TB");
                }}
              >
                {<FontAwesomeIcon icon={faCheck} />}
              </i>
              <p
                onClick={() => {
                  updateCartStatus(item.id, "TB");
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
    </InCartWrapper>
  );
};

export default InCart;
