import React from 'react'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/Action';

export const RestaurentDetail = () => {

  const dispatch = useDispatch()
  const { restaurant } = useSelector(store => store)
  const jwt = localStorage.getItem('jwt')
  const handleRestaurantStatus = (e) => {
    e.preventDefault()
    dispatch(updateRestaurantStatus({ restaurantId: restaurant.usersRestaurant?.id, jwt }))
    // window.location.reload();
  }




  return (
    <div className='lg:px-20 px-5'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>{restaurant.usersRestaurant?.name}</h1>
        <div>
          <Button color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            className='py-[1rem] px-[2rem]'
            variant='contained'
            onClick={handleRestaurantStatus} size='large'
          >
            {restaurant.usersRestaurant?.open ? "Close" : "Open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className='textgrey'>Nhà Hàng</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200 flex items-center'>
                <div className='w-1/2 flex flex-col gap-5 px-5'>
                  <div className='flex'>
                    <p className='w-48'>Chủ cửa hàng</p>
                    <p className='text-gray-400'>
                      <span className='px-5'>- </span>
                      {restaurant.usersRestaurant?.owner?.fullName}
                    </p>
                  </div>

                  <div className='flex'>
                    <p className='w-48'>Tên cửa hàng:</p>
                    <p className='text-gray-400'>
                      <span className='px-5'>- </span>
                      {restaurant.usersRestaurant?.name}
                    </p>
                  </div>

                  <div className='flex'>
                    <p className='w-48'>Loại đồ ăn: </p>
                    <p className='text-gray-400'>
                      <span className='px-5'>- </span>
                      {restaurant.usersRestaurant?.cuisineType}
                    </p>
                  </div>

                  <div className='flex'>
                    <p className='w-48'>Giờ mở cửa: </p>
                    <p className='text-gray-400'>
                      <span className='px-5'>- </span>
                      {restaurant.usersRestaurant?.openingHours}
                    </p>
                  </div>

                  <div className='flex'>
                    <p className='w-48'>Status: </p>
                    <p className='text-gray-400'>
                      <span className='px-5'>- </span>
                      {restaurant.usersRestaurant?.open ?
                        <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open </span>
                        : <span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>Close </span>}
                    </p>
                  </div>
                </div>
                <img src={restaurant.usersRestaurant?.images[0]}
                  className='w-1/2 h-[full] px-3 object-contain rounded-xl'
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} lg={6} >
          <Card>
            <CardHeader title={<span className='textgrey'>Địa chỉ</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Quốc gia:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {restaurant.usersRestaurant?.address.county}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Thành phố:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Mã số thuế:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Địa chỉ cụ thể:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {`${restaurant.usersRestaurant?.address.streetAddress},  ${restaurant.usersRestaurant?.address.stateProvice}`}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} lg={6}>
          <Card>
            <CardHeader title={<span className='textgrey'>Liên hệ</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Email:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {restaurant.usersRestaurant?.contactInfomation.email}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Số điện thoại:</p>
                  <p className='text-gray-400'>
                    <span className='px-5'>- </span>
                    {restaurant.usersRestaurant?.contactInfomation.mobile}
                  </p>
                </div>



                <div className='flex'>
                  <p className='w-48'>Mạng xã hội:</p>
                  <div className='flex text-gray-400 items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href='/'><InstagramIcon sx={{ fontSize: "3rem" }} /></a>
                    <a href='/'><FacebookIcon sx={{ fontSize: "3rem" }} /></a>
                    <a href='/'><WhatsAppIcon sx={{ fontSize: "3rem" }} /></a>
                    <a href='/'><TwitterIcon sx={{ fontSize: "3rem" }} /></a>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  )
}
