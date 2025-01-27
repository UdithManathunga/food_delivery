import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'

const FoodItem = ({id,name,price,description,image}) => {
  return (
    <div className='food-item'>
      <dev className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
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
