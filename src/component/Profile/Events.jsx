import React from 'react'
import { EventCard } from './EventCard'

export const Events = () => {
    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>Events</h1>
            <div className='mt-5 px-10 justify-around flex flex-wrap gap-5'>
                {[1, 2, 3,].map((item, index) => (
                    <EventCard />
                ))}
            </div>
        </div>
    )
}
