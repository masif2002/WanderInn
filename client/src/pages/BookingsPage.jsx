import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

import { RxCalendar } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'
import { FiChevronRight } from 'react-icons/fi'
import { HiArrowRight } from 'react-icons/hi'
import { BsCreditCard } from 'react-icons/bs'


const BookingInfo = ({ Icon, info, style='' }) => {
    return (
        <div className={`flex items-center gap-2 md:my-1 ${style}`}>
            <Icon className="md:h-6 md:w-6" />
            <p className="text-gray-700 text-sm md:text-normal">{info}</p>
        </div>
    )
}

export default function BookingsPage () {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings')
          .then(({ data }) => {
            setBookings(data.bookings)
          })
    }, [])

    return (
        <>
        {
            bookings.length < 0 ? 
            
            <h1>No bookings found. See properties here</h1> 
                : 
            <div className="mx-auto max-w-sm md:max-w-3xl mt-12">
                {
                    bookings.map(({ _id: bookingId, placeId: { _id, title, photos}, checkIn, checkOut, guests, price }) => (
                        <Link
                            key={bookingId} 
                            to={`/profile/bookings/${bookingId}`} 
                            className="bg-gray-100 rounded-2xl flex gap-5 my-8 overflow-hidden h-40 md:h-52">
                            <img src={photos[0]} alt="" className="md:shrink-0 w-48 md:w-64 aspect-square object-cover" />

                            <div className="md:px-5 py-3 min-w-0 w-full relative">
                                <h1 className="md:text-xl font-medium md:truncate pb-1 border-b border-gray-300">{title}</h1>
                                
                                <div className="flex flex-col md:flex-row md:items-center mt-1 md:mt-3 md:gap-4">
                                
                                    <BookingInfo Icon={RxCalendar} info={checkIn.slice(0, 10)} />

                                    <HiArrowRight className="hidden md:block"/>

                                    <BookingInfo Icon={RxCalendar} info={checkOut.slice(0, 10)} style={'hidden md:flex'}/>

                                </div>

                                <BookingInfo Icon={BsCreditCard} info={`₹ ${price || '20,000'}`}/>
                                
                                <BookingInfo Icon={SlPeople} info={`${guests || 1} guest(s)`}/>


                                <div
                                    className="hidden md:flex absolute bottom-3 right-5 text-sm items-center gap-1 text-gray-800 font-light"
                                >
                                    <p>View Details</p>
                                    <FiChevronRight className="inline"/>
                                </div>

                            </div>
                        </Link>
                    ))
                }
            </div>
        }
        </>
       
    )
}