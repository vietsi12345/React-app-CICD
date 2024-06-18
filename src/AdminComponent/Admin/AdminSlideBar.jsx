import React from 'react'
import { AdminPanelSettings, Category, Dashboard, Fastfood, ShoppingBag } from '@mui/icons-material'
import ShopTwoIcon from '@mui/icons-material/ShopTwo'
import Event from '@mui/icons-material/Event'
import Logout from '@mui/icons-material/Logout'
import { Divider, Drawer, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../../component/State/authentication/Action'

const menu = [
    { title: "Bảng điều khiển", icon: <Dashboard />, path: "/" },
    { title: "Đơn hàng", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Thể loại", icon: <Category />, path: "/categorys" },
    { title: "Nguyên liệu", icon: <Fastfood />, path: "/ingredients" },
    { title: "Sự kiện", icon: <Event />, path: "/events" },
    { title: "Chi tiết", icon: <AdminPanelSettings />, path: "/details" },
    { title: "Đăng xuất", icon: <Logout />, path: "/logout" }
]

export const AdminSlideBar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // const handleNavigate=(item)=>{
    //     if(item.title==="Đăng xuất"){
    //         navigate(`/`)
    //         // dispatch(logout())
    //     }else{
    //         navigate(`/admin/restaurant${item.path}`)
    //     }

    // }

    const handleNavigate = (item) => {
        navigate(`/admin/restaurant${item.path}`)
        if (item.title === "Đăng xuất") {
            navigate(`/`)
            dispatch(logOut())
            handleClose()
        }
    }
    return (
        <div >
            < >
                <Drawer variant={isSmallScreen ? "temporary" : "permanent"} onClose={handleClose} anchor='left' open="true" sx={{ zIndex: 1, position: 'relative' }}>
                    <div className='w-[70] lg:w-[20]  flex flex-col justify-center text-xl space-y-[1.65rem] mt-20 relaytive'>
                        {menu.map((item, i) => <>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </>)}
                    </div>
                </Drawer>
            </>
        </div>
    )
}
