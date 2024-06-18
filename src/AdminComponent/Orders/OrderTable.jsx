import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/Restaurant Order/Action';
import { formatMonneyVietNam } from '../../component/Ultil/formatMonneyVietNam';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivery", value: "DELIVERY" }
];

export const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector(store => store);

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant.id }));
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const [anchorEls, setAnchorEls] = useState({});

  const handleClick = (event, orderId) => {
    setAnchorEls(prev => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorEls(prev => ({ ...prev, [orderId]: null }));
  };

  const handleUpdateOrderStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose(orderId);
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title={"Tất cả đơn hàng"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center" >Ảnh</TableCell>
                <TableCell align="center">Khách hàng</TableCell>
                <TableCell align="center">Giá tiền</TableCell>
                <TableCell align="center">Tên món</TableCell>
                <TableCell align="center">Nguyên liệu</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="center">
                    <AvatarGroup>
                      {item?.items?.map((orderItem, index) => <Avatar key={index} src={orderItem?.drink?.images[0]} />)}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">{item.customer.fullName}</TableCell>
                  <TableCell align="center">{formatMonneyVietNam(item.totalPrice)}</TableCell>
                  <TableCell align="center">
                    {item.items.map((orderItem, index) => (<p key={index}>{orderItem.drink?.name}</p>))}
                  </TableCell>
                  <TableCell align="center">
                    {item.items.map((orderItem, index) =>
                      <div key={index}>
                        {orderItem.ingredients.map((ingredient, i) =>
                          <Chip key={i} label={ingredient} />
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.orderStatus}</TableCell>
                  <TableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={Boolean(anchorEls[item.id]) ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEls[item.id]) ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Cập nhật
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEls[item.id]}
                      open={Boolean(anchorEls[item.id])}
                      onClose={() => handleClose(item.id)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {orderStatus.map((status, index) => (
                        <MenuItem key={index} onClick={() => handleUpdateOrderStatus(item.id, status.value)}>{status.label}</MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
