import React, { useEffect } from 'react'
import { AdminSlideBar } from './AdminSlideBar'
import { Route, Routes } from 'react-router-dom'
import { DashBoard } from '../DashBoard/DashBoard'
import { Orders } from '../Orders/Orders'
import { Menu } from '../Menu/Menu'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { Events } from '../Event/Events'
import { RestaurentDetail } from './RestaurentDetail'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById, getRestaurantByUserId, getRestaurantsCategory } from '../../component/State/Restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action'
import { getUsersOrders } from '../../component/State/Order/Action'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'



export const Admin = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { restaurant } = useSelector(store => store)
  // console.log(restaurant.usersRestaurant?.id)
  const handleClose = () => {

  }
  useEffect(() => {
    dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant?.id }))
    // dispatch(getMenuItemsByRestaurantId())
    dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant?.id }))
    // dispatch(getRestaurantById())

  }, [restaurant.usersRestaurant?.id])

  return (
    <div>
      <div className='lg:flex justify-between'>
        <div>
          <AdminSlideBar handleClose={handleClose} />
        </div>

        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/categorys' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            <Route path='/events' element={<Events />} />
            <Route path='/details' element={<RestaurentDetail />} />
            <Route path='/add-menu' element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
