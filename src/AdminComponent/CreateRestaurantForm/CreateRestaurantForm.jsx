import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import handleChangeImaeToCloundinary from '../util/UploadToCloundinary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../component/State/Restaurant/Action';

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  StreetAddress: "",
  city: "",
  stateProvine: "",
  potalCode: "",
  country: "",
  email: "",
  number: "",
  twitter: "",
  instagram: "",
  opeiningHours: "Mon-Sun: 9am- 11pm",
  images: []
};

export const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.StreetAddress,
          city: values.city,
          stateProvine: values.stateProvine,
          postalCode: values.potalCode,
          country: values.country
        },
        contactInfomation: {
          email: values.email,
          mobile: values.number,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.opeiningHours,
        images: values.images
      };
      console.log("data create restaurant:", data);
      dispatch(createRestaurant({ data, token: jwt }))
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
      console.log("url: ", url);
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
          Add New Restaurant Form
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
              <TextField fullWidth id="cuisineType" name="cuisineType" label="CuisineType" variant='outlined' onChange={formik.handleChange} value={formik.values.cuisineType} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="opeiningHours" name="opeiningHours" label="Opening Hours" variant='outlined' onChange={formik.handleChange} value={formik.values.opeiningHours} />
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField fullWidth id="StreetAddress" name="StreetAddress" label="Street Address" variant='outlined' onChange={formik.handleChange} value={formik.values.StreetAddress} />
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField fullWidth id="city" name="city" label="City" variant='outlined' onChange={formik.handleChange} value={formik.values.city} />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField fullWidth id="stateProvine" name="stateProvine" label="State Province" variant='outlined' onChange={formik.handleChange} value={formik.values.stateProvine} />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField fullWidth id="potalCode" name="potalCode" label="Postal Code" variant='outlined' onChange={formik.handleChange} value={formik.values.potalCode} />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField fullWidth id="country" name="country" label="Country" variant='outlined' onChange={formik.handleChange} value={formik.values.country} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="email" name="email" label="Email" variant='outlined' onChange={formik.handleChange} value={formik.values.email} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="twitter" name="twitter" label="Twitter" variant='outlined' onChange={formik.handleChange} value={formik.values.twitter} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="instagram" name="instagram" label="Instagram" variant='outlined' onChange={formik.handleChange} value={formik.values.instagram} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField fullWidth id="number" name="number" label="Number" variant='outlined' onChange={formik.handleChange} value={formik.values.number} />
            </Grid>
          </Grid>
          <Button variant='contained' color='primary' type='submit'>Create Button</Button>
        </form>
      </div>
    </div>
  );
}
