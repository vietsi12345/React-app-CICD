import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import { SecurityRounded } from '@mui/icons-material';



const foodTypes = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Có calo', value: 'vegeration' },
    { label: 'Không calo', value: 'nonveg' },
    { label: 'Theo mùa', value: 'seasonal' },
]

const RestaurantDetail = () => {
    const [drinkType, setDrinkType] = useState("all")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt')
    const { auth, restaurant, menu } = useSelector(store => store)
    const [selectedCategory, setSelectedCategory] = useState("")

    const { id, city } = useParams()

    const handleFilter = (e) => {
        setDrinkType(e.target.value)
        console.log(e.target.value, e.target.name)
    }
    const handleFilterCategory = (e) => {
        setSelectedCategory(e.target.value)
        console.log(e.target.value, e.target.name)
    }

    useEffect(() => {
        dispatch(getRestaurantById({ jwt, restaurantId: id }))
        dispatch(getRestaurantsCategory({ restaurantId: id, jwt }))
    }, [])
    // console.log('restaurant', restaurant)

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: id,
            vagetarian: drinkType === "vegeration",
            nonveg: drinkType === "nonveg",
            seasonal: drinkType === "seasonal",
            drinkCategory: selectedCategory,
        }))
    }, [selectedCategory, drinkType, dispatch])


    return (
        <div className='px-5 lg:px-10'>
            <section>
                <div className='pt-5'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover'
                                src='https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/anrakutei-premium-mat-tien-1-2.JPG'
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[0]}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[1]}
                            />
                        </Grid>
                    </Grid>

                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <FmdGoodIcon />
                            <span>
                                {`${restaurant.restaurant?.address?.streetAddress}, ${restaurant.restaurant?.address?.stateProvice}, ${restaurant.restaurant?.address?.city}, ${restaurant.restaurant?.address?.county}`}
                            </span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>
                                Thứ 2 - thứ 7: 9AM-9:PM(Today)
                            </span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relaytive'>
                <div className='space-y-10 lg:w-[20%] filter'>
                    <div className='box space-y-5 lg:sticky top-28 '>
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Phân loại
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='drink_type' value={drinkType}>
                                    {
                                        foodTypes.map((item, index) =>
                                            <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
                                        )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Loại sản phẩm
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory}
                                    name='drink_category'
                                    value={selectedCategory}
                                >
                                    {
                                        restaurant.categories.map((item, index) =>
                                            <FormControlLabel key={index}
                                                value={item.name}
                                                control={<Radio />}
                                                label={item.name} />
                                        )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className='space-y-5 lg:w-[80%] filter lg:pl-10'>
                    {menu.menuItems?.map((item, index) => (
                        <MenuCard key={index} item={item}
                            restaurantId={id}
                            vagetarian={drinkType === "vegeration"}
                            nonveg={drinkType === "nonvegeration"}
                            seasonal={drinkType === "seasonal"}
                            drinkCategory={selectedCategory} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetail
