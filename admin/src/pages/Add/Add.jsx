import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {

  const url = 'http://localhost:4000';
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  })

  const onUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    console.log('Current data state:', data)
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', data)
    console.log('Image:', image)
    
    if (!image) {
      toast.error('Please upload an image')
      return
    }
    
    const formData = new FormData() 
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('image', image)

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success){
        toast.success('Food item added successfully!')
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        })
        setImage(false)
      } else {
        toast.error(response.data.message || 'Failed to add food item')
      }
    } catch (error) {
      console.error('Error adding food:', error)
      if (error.response) {
        toast.error(error.response.data.message || 'Error adding food item')
      } else {
        toast.error('Network error - make sure backend is running')
      }
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt='upload' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])}
            type='file' 
            id='image' 
            hidden 
            required 
            accept="image/*"
          />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            type='text' 
            name='name' 
            placeholder='Type here' 
            value={data.name}
            required
          />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea 
            name="description" 
            rows="6" 
            placeholder='Write content here' 
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex col">
            <p>Product category</p>
            <select 
              name="category" 
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input 
              type="Number" 
              name='price' 
              placeholder='$20' 
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button type='submit' className='add-button'>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default Add
