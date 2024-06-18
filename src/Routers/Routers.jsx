import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { AdminRoute } from './AdminRoute'
import {CustomerRouter} from './CustomerRouter'

export const Routers = () => {
  return (
    <Routes>
        <Route path='/admin/restaurant/*' element={<AdminRoute/>}></Route>
        <Route path='/*' element={<CustomerRouter/>}></Route>
    </Routes>
  )
}
