import React from 'react'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

export const Favorites = () => {
    const { auth } = useSelector(store => store)
    console.log(auth.favorites)
    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
            <div className='flex flex-wrap gap-4 justify-center mt-5'>
                {auth.favorites.map((item, index) => (
                    <RestaurantCard item={item} key={index} />
                ))}
            </div>
        </div>
    )
}
