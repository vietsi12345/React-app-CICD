import { Button, Card } from '@mui/material'
import React from 'react'
import { formatMonneyVietNam } from '../Ultil/formatMonneyVietNam'

export const OrderCard = ({ item, orderStatus }) => {
    return (
        <Card className='flex justify-between items-center p-5'>
            <div className='flex items-center gap-4 space-x-5 justify-center'>
                <img src={item.drink.images[0]}
                    className='h-16 w-16'
                />
                <div className='flex flex-col items-center gap-3'>
                    <p className='font-semibold'>{item.drink.name}</p>
                    <div className='flex gap-5 justify-around'>
                        <p className='text-base text-gray-300'>{`Số lượng: ${item.quantity}`}</p>
                        <p className='text-base text-gray-300'>{`Giá: ${formatMonneyVietNam(item.totalPrice)}`}</p>
                    </div>
                </div>
            </div>
            <div>
                <Button desable variant='outlined' className='cursor-not-allowed'>{orderStatus}</Button>
            </div>
        </Card>
    )
}
