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
            console.log(data.bookings)
            setBookings(data.bookings)
          })
    }, [])

    return (
        <>
        {
            bookings.length < 0 ? 
            
            <h1>No bookings found. See properties here</h1> 
                : 
            <div className="mx-auto max-w-3xl mt-12">
                {
                    bookings.map(({ _id: bookingId, placeId: { _id, title, photos}, checkIn, checkOut, guests }) => (
                        <div className="bg-gray-100 rounded-2xl flex gap-5 my-8 overflow-hidden h-40">
                            <img src={photos[0]} alt="" className="shrink-0 w-64 aspect-square object-cover" />

                            <div className="px-5 py-3 min-w-0 w-full relative">
                                <h1 className="text-xl font-medium truncate mb-3">{title}</h1>

                                <div className="flex my-1 items-center gap-2">
                                    <BsCalendarCheck />
                                    <p className="text-sm">Check In :</p>
                                    <p>{checkIn}</p>
                                </div>

                                <div className="flex my-1 items-center gap-2">
                                    <BsCalendarX />
                                    <p className="text-sm">Check Out :</p>
                                    <p>{checkOut}</p>
                                </div>

                                <div className="flex my-1 items-center gap-2">
                                    <CiUser />
                                    <p className="text-sm">Guests :</p>
                                    <p>{guests}</p>
                                </div>

                                <Link
                                    to={`/booking/${bookingId}`} 
                                    className="absolute bottom-3 right-5 text-sm flex items-center gap-1 text-gray-800 font-light"
                                >
                                    <p>View Details</p>
                                    <FiChevronRight className="inline"/>
                                </Link>

                            </div>
                        </div>
                    ))
                }
            </div>
        }
        </>
       
    )
}