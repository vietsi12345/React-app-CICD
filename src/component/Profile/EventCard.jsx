import { Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { formatMonneyVietNam } from '../Ultil/formatMonneyVietNam';

export const EventCard = ({ item }) => {

    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia
                    sx={{ height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src='https://img.pikbest.com/png-images/marketing-promoting-icon--vector-graphics_1780711.png!f305cw'
                        alt='Promotion'
                        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                    />
                </CardMedia>
                <CardContent className='flex flex-col items-center gap-4'>
                    <Typography variant='h5' >
                        {item.name}
                    </Typography>
                    <Typography variant='body2' >
                        {item.description}
                    </Typography>
                    <div className='pt-2 space-y-2 flex flex-col items-center'>
                        <p>{formatMonneyVietNam(item.price)}</p>
                        <p className='text-base text-blue-500'>{`Ngày bắt đầu: ${item.startDate} AM`}</p>
                        <p className='text-base text-red-500'>{`Ngày kết thúc: ${item.endDate} PM`}</p>
                    </div>
                    <div className=' flex flex-col gap-3'>
                        <p>Các sản phẩm được áp dụng: </p>
                        {item.drinks.map((drink, index) => <Chip label={drink.name} key={index} />)}
                    </div>
                </CardContent>

                {false && <CardActions >
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}
