import React from 'react'

const FavouriteItems_popup = () => {
  return (
    <div>
        <h3>Recently Purchased</h3>
        <div className='recently_purchased'>
            <button className='add_to_fav'>Like</button>
            <span className='item_name'></span>
            <button className='add_to_fav'>Delete</button>
        </div>
        <button>Close</button>
    </div>
  )
}

export default FavouriteItems_popup