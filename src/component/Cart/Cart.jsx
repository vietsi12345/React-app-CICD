import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CartItem } from './CartItem'
import { AddressCart } from './AddressCart'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createorder } from '../State/Order/Action';
import { formatMonneyVietNam } from '../Ultil/formatMonneyVietNam';
// import * as Yup from 'yup'

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    state: '',
    pincode: '',
    city: ''
}

// const validationSchema = Yup.object.shape({
//     streetAddress: Yup.string().required("Streed Address is required"),
//     state: Yup.string().required("state Address is required"),
//     pincode: Yup.required("pincode Address is required"),
//     city: Yup.string().required("city Address is required")
// })

const items = [1, 2]
const Cart = () => {

    const { cart, auth } = useSelector(store => store)
    const dispatch = useDispatch()
    console.log(cart)
    const createOrderUsingAddress = () => {

    }
    const handleOpenAddressModal = () => {
        setOpen(true)
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values) => {
        if (values.streetAddress &&
            values.city &&
            values.state &&
            values.pincode
        ) {
            const data = {
                jwt: localStorage.getItem('jwt'),
                order: {
                    restaurantId: cart.cartItems[0].drink?.restaurant?.id,
                    deliveryAddress: {
                        // fullName: auth.user?.fullName,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        stateProvice: values.state,
                        postalCode: values.pincode,
                        county: "Việt Nam"
                    }
                }
            }
            console.log("data ", data)
            console.log('form value: ', values)
            dispatch(createorder(data))
            alert("Tạo đơn hàng thành công")
        }
        else {
            alert("Vui lòng điền đầy đủ thông tin")
        }
    }

    // Tính tổng của totalitem
    const tong = cart.cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem?.totalPrice;
    }, 0);

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item total</p>
                                <p>{formatMonneyVietNam(tong)}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Phí vận chuyển</p>
                                <p>19.000 VND</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Thuế</p>
                                <p>1000 VND</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400 pt-2'>
                            <p>Tổng tiền</p>
                            <p>{formatMonneyVietNam(tong + 1000 + 19000)}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>
                            Choose Delivery Address
                        </h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1, 2, 3].map((item, index) => (
                                <AddressCart item={item} key={index} showButton={true} handleSelectAddress={createOrderUsingAddress} />
                            ))}
                            <Card className='flex gap-5 w-64 p-5' >
                                <AddLocationAltIcon />
                                <div className='space-y-3 text-gray-500 '>
                                    <h1 className='font-semibold text-lg text-white'>Thêm địa chỉ mới</h1>
                                    <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>Thêm</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}
                    // validationSchema={validationSchema}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name='streetAddress'
                                        label='Streed Address'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name='state'
                                        label='state'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name='city'
                                        label='city'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name='pincode'
                                        label='pincode'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type='submit' >Delivery Here</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}

export default Cart
