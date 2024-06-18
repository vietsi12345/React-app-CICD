import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../State/authentication/Action'

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: ""
}

export const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        console.log(values)
        dispatch(registerUser({ userData: values, navigate }))
    }
    return (
        <div >
            <Typography variant='h5' className='text-center pb-5'>
                Đăng ký
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>

                <Form className='space-y-3'>
                    <Field
                        as={TextField}
                        name='fullName'
                        label='Họ và tên'
                        fullWidth
                        variant='outlined'
                    />
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
                    <FormControl fullWidth>
                        <InputLabel id="role-simple-select-label">Quyền</InputLabel>
                        <Field
                            as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            name='role'
                            // value={age}
                            label="Role"
                        // onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Khách hàng</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Admin</MenuItem>
                        </Field>
                    </FormControl>
                    <Button sx={{ mt: 2, padding: '1rem' }} fullWidth type='submit' variant='contained'>Đăng ký</Button>
                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Bạn đã có tài khoản?
                <Button onClick={() => navigate('/account/login')}>Đăng nhập</Button>
            </Typography>
        </div>
    )
}
