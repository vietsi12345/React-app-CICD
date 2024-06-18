import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

export const AddressCart = ({ item, showButton, handleSelectAddress }) => {

    return (
        <Card className='flex gap-5 w-64 p-5' >
            <HomeIcon />
            <div className='space-y-3 text-gray-500 '>
                <h1 className='font-semibold text-lg text-white'>Home</h1>
                <p>
                    97 man thiện, phường Hiệp Phú, thành phố Thủ Đức, thành phố Hồ Chí Minh
                </p>
                {showButton && <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>Chọn</Button>}
            </div>
        </Card>
    )
}
