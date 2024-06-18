import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDiscountDrink } from '../../component/State/Menu/Action';



export const Discount = (drinkId) => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')
    // const { restaurant } = useSelector(store => store)
    const [formData, setFormData] = useState({ discount: "" })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.discount) {
            // console.log(formData)
            // console.log("object", { jwt, drinkId: drinkId.drinkId, discount: formData.discount })
            dispatch(updateDiscountDrink({ jwt, drinkId: drinkId.drinkId, discount: formData.discount }))
            alert("Thêm giảm giá thành công !!!")
        } else {
            alert("Vui lòng điền đẩy đủ thông tin!!!")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Giảm giá</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth onChange={handleInputChange} id="discount" name="discount" label="discount" variant='outlined' value={formData.discount} />
                    <Button variant='contained' type='submit '> Giảm giá</Button>
                </form>

            </div>
        </div>
    )
}
