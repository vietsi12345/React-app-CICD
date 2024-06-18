import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../State/authentication/Action';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logOut())
        navigate('/')
    }
    const { auth } = useSelector(store => store)
    console.log(auth)
    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col justify-center items-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className='py-5 text-2xl'>{`Xin chào!   ${auth.user?.fullName}`}</h1>
                <p>{`Email:  ${auth.user?.email}`}</p>
                <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>ĐĂNG XUẤT</Button>
            </div>
        </div>
    )
}
