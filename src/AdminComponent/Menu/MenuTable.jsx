import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, FormControl, FormControlLabel, IconButton, Modal, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getAllDrinkRestaurant, getMenuItemsByRestaurantId, updateMenuItemsAvaliable } from '../../component/State/Menu/Action';
import { formatMonneyVietNam } from '../../component/Ultil/formatMonneyVietNam';
import DiscountIcon from '@mui/icons-material/Discount';
import { Discount } from './Discount';


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



export const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menu, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    dispatch(getAllDrinkRestaurant(jwt))
  }, []);

  const handleUpdateStatusMenuItems = (id) => {
    dispatch(updateMenuItemsAvaliable({ drinkId: id, jwt }))
  }

  const handleDeleteDrink = (id) => {
    dispatch(deleteFoodAction({ drinkId: id, jwt }))
  }

  const [open, setOpen] = React.useState(false);
  const [selectedDrinkId, setSelectedDrinkId] = useState(null); // State để lưu id của đồ uống được chọn
  const handleOpen = (drinkId) => { // Truyền drinkId vào hàm handleOpen
    setSelectedDrinkId(parseInt(drinkId, 10)); // Chuyển đổi drinkId thành số và lưu vào state
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedDrinkId(null); // Reset selectedDrinkId khi đóng Modal
  };


  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={
          <IconButton onClick={() => navigate('/admin/restaurant/add-menu')} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Menu"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '5%' }}>ID</TableCell>
                <TableCell sx={{ width: '5%' }} align="center">Ảnh</TableCell>
                <TableCell sx={{ width: '20%' }} align="center">Tiêu đề</TableCell>
                <TableCell sx={{ width: '20%' }} align="center">Nguyên liệu</TableCell>
                <TableCell sx={{ width: '25%' }} align="center">Mô tả</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Giá tiền</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Có sẵn</TableCell>
                <TableCell sx={{ width: '5%' }} align="center">Xoá</TableCell>
                <TableCell sx={{ width: '5%' }} align="center">Giảm giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.allDrinks?.map((drink, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{drink?.id}</TableCell>
                  <TableCell align="center">
                    <Avatar src={drink?.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="center">{drink?.name}</TableCell>
                  <TableCell align="center">
                    {drink.ingredientsItems?.map((item, index) => <Chip key={index} label={item.name} />)}
                  </TableCell>
                  <TableCell align="center">{drink?.description}</TableCell>
                  <TableCell align="center">{formatMonneyVietNam(drink?.price)}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleUpdateStatusMenuItems(drink?.id)}>   {drink.available ? "Còn hàng" : "Tạm hết hàng"}</Button>
                  </TableCell>
                  <TableCell align="center"><IconButton><DeleteIcon onClick={() => handleDeleteDrink(drink?.id)} /></IconButton></TableCell>
                  <TableCell align="center"><IconButton><DiscountIcon onClick={() => handleOpen(drink.id)} /></IconButton></TableCell> {/* Truyền drink.id vào hàm handleOpen */}
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
          <Discount drinkId={selectedDrinkId} /> {/* Truyền selectedDrinkId vào component Discount */}
        </Box>
      </Modal>
    </Box>
  )
}
