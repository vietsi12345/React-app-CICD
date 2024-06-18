import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Admin } from '../AdminComponent/Admin/Admin'
import { CreateRestaurantForm } from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useSelector } from 'react-redux'
import { getRestaurantByUserId } from '../component/State/Restaurant/Action'


export const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store)
  // const jwt = localStorage.getItem('jwt')
  // useEffect(() => {
  //   getRestaurantByUserId(jwt)
  // }, [])

  return (
    <Routes>
      <Route path="*" element={!restaurant?.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} >
      </Route>
    </Routes>
  )
}
