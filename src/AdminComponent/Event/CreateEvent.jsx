import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { getAllDrinkRestaurant, getDrinksNotPromotion } from '../../component/State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../component/State/Restaurant/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CreateEvent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restaurant, menu } = useSelector(store => store)
  const jwt = localStorage.getItem('jwt')
  const [formValues, setFormValues] = useState({
    price: "",
    description: "",
    name: "",
    startDate: dayjs(), // Khởi tạo giá trị ngày hợp lệ ban đầu
    endDate: dayjs(), // Khởi tạo giá trị ngày hợp lệ ban đầu
    drinks: []
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.price &&
      formValues.description &&
      formValues.name &&
      formValues.drinks.length > 0
    ) {
      const data = {
        ...formValues,
        startDate: formValues.startDate.format("DD/MM/YYYY hh:mm"), // Format ngày bắt đầu
        endDate: formValues.endDate.format("DD/MM/YYYY hh:mm"), // Format ngày kết thúc
        drinksId: formValues.drinks.map(drink => drink.id)
      }
      // Xử lý logic gửi form ở đây

      console.log(data)
      dispatch(createEventAction({ jwt: localStorage.getItem("jwt"), data }))
      alert("Thêm khuyến mãi thành công")
    }
    else alert("Vui lòng điền đầy đủ thông tin")
  }

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedDrinks = menu.drinksNotPromotion.filter(drink => value.includes(drink.id));
    setFormValues({
      ...formValues,
      drinks: selectedDrinks
    });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date })
  }

  useEffect(() => {
    dispatch(getDrinksNotPromotion(jwt))
  }, [])

  return (
    <Box sx={style}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name='name'
              label="Tên sự kiện"
              variant='outlined'
              fullWidth
              value={formValues.name}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='price'
              label="Giá"
              variant='outlined'
              fullWidth
              value={formValues.price}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='description'
              label="Mô tả"
              variant='outlined'
              fullWidth
              value={formValues.description}
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Drinks</InputLabel>
              <Select
                name='drinks'
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={formValues.drinks.map(drink => drink.id)}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="ingredients" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => (
                      <Chip key={id} label={menu.drinksNotPromotion.find(drink => drink.id === id)?.name} />
                    ))}
                  </Box>
                )}
              >
                {menu.drinksNotPromotion?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ngày và giờ bắt đầu"
                value={formValues.startDate}
                onChange={(newValue) =>
                  handleDateChange(newValue, "startDate")
                }
                inputFormat="DD/MM/YYYY hh:mm A"  // Thay đổi định dạng ngày
                className='w-full'
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ngày và giờ kết thúc"
                value={formValues.endDate}
                onChange={(newValue) =>
                  handleDateChange(newValue, "endDate")
                }
                inputFormat="DD/MM/YYYY hh:mm A"  // Thay đổi định dạng ngày
                className='w-full'
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant='contained' fullWidth>Gửi</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
