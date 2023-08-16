import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

import { RxCalendar } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'
import { FiChevronRight } from 'react-icons/fi'
import { HiArrowRight } from 'react-icons/hi'
import { BsCreditCard } from 'react-icons/bs'

import { BookingInfo } from '../components'


export default function BookingsPage () {
    const [bookings, setBookings] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        axios.get('/bookings')
          .then(({ data }) => {
            setBookings(data.bookings)
            setFetching(false)
          })
    }, [])

    if (fetching) {
        return (
            <h3 className="text-3xl text-center mt-20">Loading ....</h3> 
        )
    }

    return (
        <>
        {
            bookings.length < 1 ? 
            
            <div>
                <h3 className="text-3xl text-center mt-20">No bookings found</h3> 
                <Link 
                    to={'/'}
                    className="mt-4 text-center bg-primary px-4 py-2 rounded-3xl max-w-xs mx-auto text-white block">Book properties here
                </Link>
            </div>
                : 
            <div className="mx-auto max-w-sm md:max-w-3xl mt-12">
                {
                    bookings.map(({ _id: bookingId, place: { _id, title, photos}, checkIn, checkOut, guests, price }) => (
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