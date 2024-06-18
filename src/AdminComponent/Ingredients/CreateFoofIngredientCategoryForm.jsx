import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { createIngredientCategory } from '../../component/State/Ingredients/Action';
import { useDispatch, useSelector } from 'react-redux';

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')
    const { restaurant } = useSelector(store => store)
    const [formData, setFormData] = useState({ name: "" })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name) {
            // console.log(formData)
            const data = { name: formData.name, restaurantId: restaurant.usersRestaurant?.id }
            dispatch(createIngredientCategory({ data: data, jwt }))
            alert("Tạo  nguyên liệu mới thành công !!!")
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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Tạo thể loại</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth onChange={handleInputChange} id="name" name="name" label="name" variant='outlined' value={formData.name} />
                    <Button variant='contained' type='submit '> Create category</Button>
                </form>

            </div>
        </div>
    )
}
