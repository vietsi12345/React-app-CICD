import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/authentication/Action'

const initialValues = {
    email: "",
    password: ""
}
export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }))
    }
    return (
        <div >
            <Typography variant='h5' className='text-center pb-5'>
                Đăng nhập
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>

                <Form className='space-y-3'>
                    <Field
                        as={TextField}
                        name='email'
                        label='Email'
                        fullWidth
                        variant='outlined'
                    />
                    <Field
                        as={TextField}
                        name='password'
                        label='Mật khẩu'
                        fullWidth
                        variant='outlined'
                        type='password'
                    />
                    <Button sx={{ mt: 2, padding: '1rem' }} fullWidth type='submit' variant='contained'>Đăng nhập</Button>
                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Bạn chưa có tài khoản?
                <Button onClick={() => navigate('/account/register')}>Đăng ký</Button>
            </Typography>
        </div>
    )
}
