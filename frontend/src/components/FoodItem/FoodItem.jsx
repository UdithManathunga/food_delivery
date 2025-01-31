import React, { useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'

const FoodItem = ({id,name,price,description,image}) => {

  const [itemCount, setItemCount] = useState(0)

  return (
    <div className='food-item'>
      <dev className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        {!itemCount
        ? <img className='add' onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_white} alt=''/>
        :<dev className="food-item-counter">
          <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.remove_icon_red} alt="" />
          <p>{itemCount}</p>
          <img onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_green} alt="" />
        </dev>

        }
      </dev>   
      <dev className="food-item-info">
        <dev className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </dev>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price }</p>
        </dev>   
    </div>
  )
}

export default FoodItem
