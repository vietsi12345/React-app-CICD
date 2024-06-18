import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import handleChangeImaeToCloundinary from '../util/UploadToCloundinary';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
import { createMenuItem } from '../../component/State/Menu/Action';

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: { id: "", name: "" },  // Chỉnh sửa ở đây
  restaurantId: "",
  vegetarian: true,
  seasonal: false,  // Sửa lại chính tả
  ingredientsItems: [],
  images: []
};

export const CreateMenuForm = () => {

  const dispatch = useDispatch();
  const { ingredients, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant?.id, jwt }));
  }, []);

  const [uploadImage, setUploadImage] = useState(false);

  const validateForm = (values) => {
    if (
      !values.name ||
      !values.description ||
      !values.price ||
      !values.category ||
      !Array.isArray(values.ingredientsItems) || !values.ingredientsItems.length ||
      !Array.isArray(values.images) || !values.images.length
    ) {
      return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (validateForm(values)) {
        values.restaurantId = restaurant.usersRestaurant?.id;
        console.log("data:", values);
        dispatch(createMenuItem({ menu: values, jwt }));
        alert("Tạo sản phẩm mới thành công!!");
      } else {
        alert("Vui lòng nhập đầy đủ thông tin");
      }
    }
  });


  const handleRemoveIndex = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);

    try {
      const url = await handleChangeImaeToCloundinary(file);
      formik.setFieldValue("images", [...formik.values.images, url]);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadImage(false);
    }
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Thêm menu
        </h1>

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' item xs={12}>
              <input accept='image/*' type='file' id='fileInput' style={{ display: "none" }} onChange={handleImageChange}></input>
              <label htmlFor="fileInput" className='relative'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-white' />
                </span>
                {
                  uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                }
              </label>

              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative' key={index}>
                    <img src={image} alt="image" className='w-24 h-24 object-cover' />
                    <IconButton onClick={() => handleRemoveIndex(index)} size='small' sx={{ position: 'absolute', top: 0, right: 0, outline: "none" }} title='remove'>
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField fullWidth id="name" name="name" label="Name" variant='outlined' onChange={formik.handleChange} value={formik.values.name} />
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField fullWidth id="description" name="description" label="Description" variant='outlined' onChange={formik.handleChange} value={formik.values.description} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="price" name="price" label="price" variant='outlined' onChange={formik.handleChange} value={formik.values.price} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category.id}
                  label="category"
                  onChange={(e) => {
                    const selectedCategory = restaurant.categories?.find(cat => cat.id === e.target.value);
                    formik.setFieldValue('category', selectedCategory);
                  }}
                  name="category"
                >
                  {restaurant.categories?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  name='ingredientsItems' // Đổi name thành ingredientItems
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={formik.values.ingredientsItems} // Sử dụng ingredientItems
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                >
                  {ingredients.ingredients?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  label="seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  label="vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant='contained' color='primary' type='submit'>Create Menu item</Button>
        </form>
      </div>
    </div>
  );
};
