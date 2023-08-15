import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react"

import { ImageGrid } from '../components'

import { BsCalendarCheck, BsCalendarX } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'

const BookingDetailWidget = ({ checkIn, checkOut, guests }) => {
    return (
        <div className="mt-4 flex justify-around bg-gray-100 p-3 rounded-2xl">

            <div className="flex my-1 items-center gap-2">
                <BsCalendarCheck className="h-5 w-5"/>
                <p className="text-sm font-medium">Check In :</p>
                <p>{checkIn.slice(0, 10)}</p>
            </div>

            <div className="flex my-1 items-center gap-2">
                <BsCalendarX className="h-5 w-5"/>
                <p className="text-sm font-medium">Check Out :</p>
                <p>{checkOut.slice(0, 10)}</p>
            </div>

            <div className="flex my-1 items-center gap-2">
                <CiUser className="h-5 w-5"/>
                <p className="text-sm font-medium">Guests :</p>
                <p>{guests}</p>
            </div>

        </div>
    )
}

export default function BookingDetails() {
    const { id } = useParams()
    const [details, setDetails] = useState(null)

    useEffect(() => {
        axios.get(`/booking/${id}`)
            .then(({ data }) => {
                setDetails(data.booking)
            })
    }, [])
    
   

    return (
        <>
            {
                details && (
                <div className="max-w-3xl mx-auto mt-16">
                    <ImageGrid
                        title={details.placeId.title}
                        photos={details.placeId.photos}
                        address={details.placeId.address}
                        children={<BookingDetailWidget checkIn={details.checkIn} checkOut={details.checkOut} guests={details.guests} />}
                    />
                </div>

                ) 
            }
        </>
        
    )
}