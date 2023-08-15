import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BsCalendarCheck, BsCalendarX } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { FiChevronRight } from 'react-icons/fi'

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
                    bookings.map(({ _id: bookingId, placeId: { _id, title, photos}, checkIn, checkOut, guests }) => (
                        <Link 
                            to={`/profile/bookings/${bookingId}`} 
                            className="bg-gray-100 rounded-2xl flex gap-5 my-8 overflow-hidden h-48 md:h-40">
                            <img src={photos[0]} alt="" className="md:shrink-0 w-48 md:w-64 aspect-square object-cover" />

                            <div className="md:px-5 py-3 min-w-0 w-full relative">
                                <h1 className="md:text-xl font-medium md:truncate mb-3">{title}</h1>

                                <div className="flex my-1 items-center gap-2">
                                    <BsCalendarCheck />
                                    <p className="hidden md:block text-sm">Check In :</p>
                                    <p>{checkIn.slice(0, 10)}</p>
                                </div>

                                <div className="flex my-1 items-center gap-2">
                                    <BsCalendarX />
                                    <p className="hidden md:block text-sm">Check Out :</p>
                                    <p>{checkOut.slice(0, 10)}</p>
                                </div>

                                <div className="flex my-1 items-center gap-2">
                                    <CiUser />
                                    <p className="hidden md:block text-sm">Guests :</p>
                                    <p>{guests}</p>
                                </div>

                                <Link
                                    to={`/profile/bookings/${bookingId}`} 
                                    className="absolute bottom-3 right-5 text-sm flex items-center gap-1 text-gray-800 font-light"
                                >
                                    <p>View Details</p>
                                    <FiChevronRight className="inline"/>
                                </Link>

                            </div>
                        </Link>
                    ))
                }
            </div>
        }
        </>
       
    )
}