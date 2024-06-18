import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

export const CreateFoodCategoryForm = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.categoryName) {
            const data = {
                name: formData.categoryName,
                // restaurantId: {
                //     id: 1
                // }
            }

            console.log(data)
            dispatch(createCategoryAction({ reqData: data, jwt }))
            alert("Tạo thể loại mới thành công !!")
        } else {
            alert("Vui lòng nhập đầy đủ thông tin !!")
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
                    <TextField fullWidth onChange={handleInputChange} id="categoryName" name="categoryName" label="categoryName" variant='outlined' value={FormData.categoryName} />
                    <Button variant='contained' type='submit '> Create category</Button>
                </form>

            </div>
        </div>
    )
}
