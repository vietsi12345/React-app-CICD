import { Box, Button, Card, CardActions, CardHeader, FormControl, FormControlLabel, IconButton, Modal, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateFoodCategoryForm } from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';

const orders = [1, 1, 1, 1, 1, 1, 1]

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



export const FoodCategoryTable = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant?.id }))
  }, [])

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Menu"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Thể loại</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  )
}
