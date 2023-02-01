import React from 'react'

const ShoppingList_item = ({tobuyItem}) => {

  return (
  <div className="to_buy_item">
    {tobuyItem.map((item, index) => {
      return (
        <>
        <span>{item.name}</span>
        <button>Edit item</button>
        </>
      )
    })}
    
  </div>
  )
}

export default ShoppingList_item