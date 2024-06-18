import React, { useEffect } from 'react'
import { OrderCard } from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../State/Order/Action'

export const Orders = () => {
    const { order } = useSelector(store => store)
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')
    useEffect(() => {
        dispatch(getUsersOrders(jwt))
    }, [])

    return (
        <div className='flex items-center flex-col'>
            <h1 className='text-xl text-center py-7 font-semibold'>My orders</h1>
            <div className='space-y-5 w-full lg:w-1/2'>
                {
                    order.orders.map((order, index) => (
                        order.items.map((item, i) => (
                            <OrderCard key={i} item={item} orderStatus={order.orderStatus} />
                        ))
                    ))
                }
            </div>
        </div>
    )
}
