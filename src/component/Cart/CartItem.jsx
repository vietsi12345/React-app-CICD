import React, { useEffect } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { findCart, removeCartItem, updateCartItem } from '../State/Cart/Action';
import { formatMonneyVietNam } from '../Ultil/formatMonneyVietNam';

export const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')

    const handleUpdateCartItem = (value) => {
        console.log(item.quantity, 'so luong')
        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem()
        }
        const data = { cartItemId: item.id, quantity: item.quantity + value }
        // console.log("data", data)
        dispatch(updateCartItem({ data, jwt }))
        // dispatch(findCart(jwt))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt }))
    }

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[80px] object-cover'
                        src={item?.drink?.images[0]}
                        alt=""
                    />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 '>
                        <p>{item?.drink?.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>{formatMonneyVietNam(item.totalPrice)}</p>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {item.ingredients.map((ingredient, index) => (
                    <Chip label={ingredient} key={index} />
                ))}
            </div>
        </div>
    )
}
