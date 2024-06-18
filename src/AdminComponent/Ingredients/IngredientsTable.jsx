import { Box, Button, Card, CardActions, CardHeader, FormControl, FormControlLabel, IconButton, Modal, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateFoodIngredientsForm } from './CreateFoodIngredientsForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockIngredient } from '../../component/State/Ingredients/Action';

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

export const IngredientsTable = () => {
  const dispatch = useDispatch()
  const { ingredients, restaurant } = useSelector(store => store)
  const jwt = localStorage.getItem('jwt')

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant?.id, jwt }))
  }, [])

  const handleUpdateStoke = (id) => {
    dispatch(updateStockIngredient({ id, jwt }))
  }
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Nguyên liệu"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Tên</TableCell>
                <TableCell align="left">Thể loại</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients?.map((ingredient, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{ingredient.id}</TableCell>
                  <TableCell align="left">{ingredient.name}</TableCell>
                  <TableCell align="left">{ingredient.category?.name}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleUpdateStoke(ingredient.id)}> {ingredient.stoke ? "Còn trong kho" : "Hết Hàng"}</Button>
                  </TableCell>
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
          <CreateFoodIngredientsForm />
        </Box>
      </Modal>
    </Box>
  )
}
