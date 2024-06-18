import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { getAllDrinkRestaurant } from '../../component/State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEvent } from './CreateEvent';
import { EventCard } from '../../component/Profile/EventCard';
import { getAllEvents } from '../../component/State/Restaurant/Action';


export const Events = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restaurant } = useSelector(store => store)
  const jwt = localStorage.getItem('jwt')


  useEffect(() => {
    console.log(jwt)
    dispatch(getAllEvents(jwt))
  }, [])


  return (
    <div>
      <div className='mt-5'>
        <Button onClick={handleOpen} variant='contained'>Tạo chương trình khuyến mãi</Button>

        <div>
          <h1 className='py-5 text-xl font-semibold text-center'>Chương trình khuyến mãi</h1>
          <div className='mt-5 px-10 justify-around flex flex-wrap gap-5'>
            {restaurant?.events?.map((item, index) => (
              <EventCard key={index} item={item} />
            ))}
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateEvent />
        </Modal>
      </div>
    </div>
  )
}
