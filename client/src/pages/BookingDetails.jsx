import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react"

import { ImageGrid, BookingInfo } from '../components'

import { RxCalendar } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'
import { HiArrowRight } from 'react-icons/hi'

const BookingDetailWidget = ({ checkIn, checkOut, guests, price }) => {
    return (
        <div className="mt-4 bg-gray-100 p-5 rounded-2xl flex justify-between">
            
            <div className="">
                <h2 className="text-xl mb-2 font-light">Booking Details:</h2>

                <BookingInfo Icon={SlPeople} info={`${guests || 1} guest(s)`} style={'px-3'}/>

                <div className="flex flex-row items-center gap-2 px-3">
                
                    <BookingInfo Icon={RxCalendar} info={checkIn.slice(0, 10)} />

                    <HiArrowRight className="hidden md:block"/>

                    <BookingInfo Icon={RxCalendar} info={checkOut.slice(0, 10)} style={'hidden md:flex'}/>

                </div>
            </div>

            <div className="px-8 bg-primary text-white rounded-3xl flex flex-col justify-center">
                <p className="text-sm -mb-1 font-light">Your price</p>
                <p className="text-xl">₹ {price || '20,000'}</p>
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
                <div className="max-w-sm sm:max-w-xl md:max-w-3xl mx-auto mt-16">
                    <ImageGrid
                        title={details.placeId.title}
                        photos={details.placeId.photos}
                        address={details.placeId.address}
                        children={<BookingDetailWidget checkIn={details.checkIn} checkOut={details.checkOut} guests={details.guests} price={details.price} />}
                    />
                </div>

                ) 
            }
        </>
        
    )
}