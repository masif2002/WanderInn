import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import { ImageGrid } from '../components'
import differenceInDays from 'date-fns/differenceInDays'

const InputField = ({ field, value, setValue, type, className }) => {
  return (
    <div className={className}>

      <label className='uppercase text-xs font-medium block'>{field}</label>
      <input 
        className='font-light focus:outline-0 border-none w-full' 
        type={type} 
        value={value}
        onChange={(ev) => setValue((ev.target.value))} 
      />

    </div>
  )
}

const AccomodationDetails = () => {
  const { id } = useParams()

  const [details, setDetails] = useState({})

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [totalGuests, setTotalGuests] = useState(1)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  // Fetch details about the place
  useEffect(() => {
    if (!id) return

    axios.get(`/place/${id}`)
      .then(({ data: { placeDoc } }) => {
        setDetails(placeDoc)
      })
  }, [])

  // Set name in form
  useEffect(() => {
    if (user) setFullName(user.name)
  }, [user])


  const bookPlace = () => {

    axios.post('/booking', {placeId: id, checkIn, checkOut, guests: totalGuests, fullName, phone, price: details.price})
      .then(({ data }) => {
        const { message } = data
        alert(message)
        navigate('/profile/bookings')
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }


  

  return (

    <div className="bg-gray-100">
        <div className='max-w-sm md:max-w-lg lg:max-w-4xl 2xl:max-w-6xl mx-auto py-16'> 

        <ImageGrid 
          title={details.title}
          photos={details.photos}
          address={details.address}
        />

        {/* Description */}
        <div className='mt-10 '>
          <h2 className='text-2xl capitalize font-medium'>About the place</h2>
          <p className='text-gray-800'>{details.description}</p>
        </div>

        {/* Other Info & Booking widget*/}
        <div className="mt-8 flex flex-col md:grid md:grid-cols-[6fr_4fr] gap-6">
            <div>
              <p><span className="font-medium text-lg">Check-in:</span> {details.checkIn} </p>
              <p><span className="font-medium text-lg">Check-out:</span> {details.checkOut} </p>
              <p><span className="font-medium text-lg">Max Guests: </span> {details.maxGuests} </p>
              
              <h2 className='text-2xl capitalize font-medium mt-6'>Extra info</h2>
              <p className='text-gray-600'>{details.extraInfo}</p>
            </div>

            {/* Booking widget */}
            <div className='mt-4 md:-mt-4 border p-5 shadow-lg rounded-2xl bg-white'>
              <h4 className="font-medium text-lg">
                ₹{details.price + ' '} 
                <span className="font-light text-gray-500 text-sm">
                per night
                </span>
              </h4>

              <div className="mt-4 border rounded-2xl border-gray-300 grid grid-cols-2">

                  <InputField 
                    className='p-3'
                    field='Check-in'
                    type='date'
                    value={checkIn}
                    setValue={setCheckIn}

                  />
                  <InputField 
                    className='border-l border-gray-300 p-3' 
                    field='Check-out'
                    type='date'
                    value={checkOut}
                    setValue={setCheckOut} 
                  />
                  
                  <InputField 
                    className='col-span-2 border-t border-gray-300 p-3' 
                    field='Guests' 
                    type='number' 
                    value={totalGuests} 
                    setValue={setTotalGuests} 
                />
                  
                  {
                    checkIn && checkOut && (
                      <>
                        <InputField 
                          className='col-span-2 border-t border-gray-300 p-3' 
                          field='Full Name'
                          type='text' 
                          value={fullName} 
                          setValue={setFullName} 
                        />
      
                        <InputField 
                          className='col-span-2 border-t border-gray-300 p-3' 
                          field='Phone' 
                          type='tel' 
                          value={phone} 
                          setValue={setPhone} 
                        />
                      </>
                    )
                  }
              
              </div>
              
              {/* Havent handled missing fields */}
              <button 
                onClick={bookPlace}
                className="mt-4 primary rounded-xl capitalize"
              >
                Book now
              </button>

            </div>

        </div>


      </div>
    </div>
  )
}

export default AccomodationDetails