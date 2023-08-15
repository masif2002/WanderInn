import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

import { FiMapPin } from 'react-icons/fi'
import { BsGrid1X2, BsChevronLeft } from 'react-icons/bs'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

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

const DetailsPage = () => {
  const { id } = useParams()

  const [details, setDetails] = useState({})
  const [displayPhotos, setDisplayPhotos] = useState(false)

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
    axios.post('/booking', {placeId: id, checkIn, checkOut, guests: totalGuests, fullName, phone})
      .then(({ data }) => {
        const { message } = data
        alert(message)
        navigate('/profile/bookings')
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }


  {/* Display all photos*/}
  if (displayPhotos && details.photos) {

    window.scrollTo(0, 0)

    return (
      <div className="bg-white absolute text-black inset-0 min-h-screen py-12">
        <button
          onClick={() => setDisplayPhotos(false)} 
          className="fixed top-3 left-16 px-4 py-2 border border-primary rounded-3xl font-light flex items-center gap-2 bg-primary text-white">
          <BsChevronLeft className='h-3 w-3' />
          Back
        </button>
        <div className="grid gap-4 pb-12">
          {
            details.photos.map(photo => 
                <img src={photo} key={photo} className='object-cover mx-auto max-h-[75vh] rounded-md' />
              )
          }
        </div>
      </div>
    )
  }

  return (

    <div className='max-w-4xl 2xl:max-w-6xl mx-auto py-16'> 

      <h1 className='text-3xl'>{details.title}</h1>
      <div className="flex items-center gap-1">
        <FiMapPin />
        <a target='_blank' href={`https://maps.google.com?q=${details.address}`} className='mt-1 text-gray-600 underline'>{details.address}</a>
      </div>

      {/* Image Collage */}
      { details.photos && (
        <div 
        onClick={() => setDisplayPhotos(true)}  
        className="mt-6 grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-3xl relative mx-auto ">
          <img src={details.photos[0]} className='aspect-square object-cover cursor-pointer' alt="" />
          <div>
            <img src={details.photos[1]} alt="" className='aspect-square object-cover cursor-pointer' />
            <img src={details.photos[2]} alt="" className='aspect-square object-cover relative top-2 cursor-pointer' />
          </div>
          <button 
            className="absolute bg-white rounded-2xl px-4 py-2 flex gap-2 items-center bottom-2 right-2 opacity-90 hover:opacity-100 text-sm cursor-pointer"
          >
            <BsGrid1X2 className='h-4 w-4'/>
            <p className='font-light'>Show all photos</p>
          </button>

        </div>
      )}

      {/* Description */}
      <div className='mt-10 '>
        <h2 className='text-2xl capitalize font-medium'>About the place</h2>
        <p className='text-gray-800'>{details.description}</p>
      </div>

      {/* Other Info & Booking widget*/}
      <div className="mt-8 grid grid-cols-[6fr_4fr] gap-6">
          <div>
            <p><span className="font-medium text-lg">Check-in:</span> {details.checkIn} </p>
            <p><span className="font-medium text-lg">Check-out:</span> {details.checkOut} </p>
            <p><span className="font-medium text-lg">Max Guests: </span> {details.maxGuests} </p>
            
            <h2 className='text-2xl capitalize font-medium mt-6'>Extra info</h2>
            <p className='text-gray-600'>{details.extraInfo}</p>
          </div>

          {/* Booking widget */}
          <div className='-mt-4 border p-5 shadow-lg rounded-2xl'>
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
                        type='text' 
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
  )
}

export default DetailsPage