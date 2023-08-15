import React from 'react'

const BookingInfo = ({ Icon, info, style='' }) => {
    return (
        <div className={`flex items-center gap-2 md:my-1 ${style}`}>
            <Icon className="md:h-6 md:w-6" />
            <p className="text-gray-700 text-sm md:text-normal">{info}</p>
        </div>
    )
}

export default BookingInfo