import React from 'react'

const ShoppingList_item = ({tobuyItem, setTobuyItem}) => {

  const handleDeleteItem = (id) => {
     const newItems = tobuyItem.filter((l) => l.id !== id);
     setTobuyItem(newItems);
}

  return (
  <div className="to_buy_item">
    {tobuyItem.map((item, index) => {
      return (
        <>
        <span key={item.id}>{item.name}</span>
        <button 
        onClick={() => handleDeleteItem(item.id)}
        >Delete item</button>
        </>
      )
    })}
    
  </div>
  )
}

export default ShoppingList_item