import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../component/State/Ingredients/Action';

export const CreateFoodIngredientsForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { ingredients, restaurant } = useSelector(store => store);
    const [formData, setFormData] = useState({ name: "", categoryId: "" });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.categoryId) {
            e.preventDefault();
            const data = {
                ...formData, restaurantId: restaurant.usersRestaurant?.id
            };

            console.log(data);
            dispatch(createIngredient({ data, jwt }))
            alert("Tạo  nguyên liệu mới thành công !!!")
        } else {
            alert("Vui lòng điền đẩy đủ thông tin!!!")
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Tạo nguyên liệu</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        onChange={handleInputChange}
                        id="name"
                        name="name"
                        label="Tên nguyên liệu"
                        variant='outlined'
                        value={formData.name}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.categoryId || ""}
                            label="Thể loại"
                            onChange={handleInputChange}
                            name="categoryId"
                        >
                            {ingredients.category?.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant='contained' type='submit'>Tạo nguyên liệu mới</Button>
                </form>
            </div>
        </div>
    );
};
