import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { MdPets } from 'react-icons/md'
import { PiSwimmingPoolDuotone, PiTelevisionSimpleLight } from 'react-icons/pi'
import { BiSolidParking } from 'react-icons/bi'

import { Perk, PhotoUploader } from '../components'

const FormInput = ({ label, subText, textBox=false, placeholder, inputStyle, value, setValue }) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="font-semibold text-xl ml-3">{label}</label>
            <p className="ml-3 text-sm text-gray-400">{subText}</p>
            {!textBox && 
              <input 
                type="text" 
                className='textfield rounded-2xl'
                placeholder={placeholder} 
                value={value}
                onChange={(ev) => {
                  setValue(ev.target.value)
                }}
              />}
            {textBox && 
              <textarea 
                rows={5}
                className="rounded-lg" 
                value={value}
                onChange={(ev) => {
                  setValue(ev.target.value)
                }}
              />}
        </div>

    )
}

const AddAccomodationPage = () => {
    const navigate = useNavigate();
    const { id } = useParams() // id of the current place (if existing)

    
    useEffect(() => {
      if (!id) return
      
      // retrieve and set details of place for edit 
      axios.get(`/place/${id}`)
        .then(({ data: { placeDoc } }) => {
          const { title, description, address, perks, extraInfo, checkIn, checkOut, maxGuests, price, photos } = placeDoc
          setTitle(title)
          setDescription(description)
          setAddress(address)
          setPerks(perks)
          setExtraInfo(extraInfo)
          setCheckIn(checkIn)
          setCheckOut(checkOut)
          setPrice(price)
          setMaxGuests(maxGuests)
          setUploadedPhotos(photos)
        })
    }, [])
  
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState('')
    const [price, setPrice] = useState('')
    const [uploadedPhotos, setUploadedPhotos] = useState([])
    
    const handleSubmit = (ev) => {
      ev.preventDefault()

      if (!id) return addNewPlace()
      
      updatePlace()
    }

    const addNewPlace = () => {
      
      axios.post('/place', {
        title, description, address, perks, extraInfo, checkIn, checkOut, maxGuests, price, photos: uploadedPhotos
      })
      .then(() => {
        alert("New place added")
        navigate('..', { relative: "path" })
      })
      .catch((err) => {
        console.log(err)
        alert("Oops! Something went wrong!")
      })
  
    }

    const updatePlace = () => {

      axios.put('/place', {
        id, title, description, address, perks, extraInfo, checkIn, checkOut, maxGuests, price, photos: uploadedPhotos
      })
        .then(() => {
          alert('Place updated')
          navigate('..', { relative: "path" })
        })
        .catch((err) => {
          console.log(err)
          alert("Oops! Something went wrong!")
        })
    }
  
  
    return (
      <>

        <form className="mt-10 py-5 px-10 max-w-5xl mx-auto mb-64" onSubmit={handleSubmit}>
            
            <FormInput 
            label='Title' 
            subText='Text that is displayed to the users on the front page'
            value={title}
            setValue={setTitle}
            />
            <FormInput 
            label='Description' 
            subText='Description of the place, the ambience, nearby stores, etc... ' 
            textBox={true}
            value={description}
            setValue={setDescription}
            />
            <FormInput 
            label='Address'
            subText='Address of the place and some nearby popular landmarks if any'
            value={address}
            setValue={setAddress}
            />

            {/* Photos */}
            <PhotoUploader uploadedPhotos={uploadedPhotos} setUploadedPhotos={setUploadedPhotos} />

            {/* Perks */}
            <div className="mb-4">
                <label htmlFor="" className="font-semibold text-xl ml-3">Perks</label>
                <p className="ml-3 text-sm text-gray-400">Choose the perks that are available in your place</p>

                <div className="grid grid-cols-3 gap-2">

                    <Perk name="wifi" Icon={AiOutlineWifi} allPerks={perks} choosePerk={setPerks}/>
                    <Perk name="parking" Icon={BiSolidParking} allPerks={perks} choosePerk={setPerks}/>
                    <Perk name="pets" Icon={MdPets} allPerks={perks} choosePerk={setPerks}/>
                    <Perk name="Swimming pool" Icon={PiSwimmingPoolDuotone} allPerks={perks} choosePerk={setPerks}/>
                    <Perk name="TV" Icon={PiTelevisionSimpleLight} allPerks={perks} choosePerk={setPerks}/>
                    <Perk name="valet" Icon={AiOutlineCar} allPerks={perks} choosePerk={setPerks}/>
                    
                </div>
            </div>

            {/* Extrainfo */}
            <FormInput 
            label='Extra Info'
            subText='Any extra information that you would like your clients to know' 
            textBox={true}
            value={extraInfo}
            setValue={setExtraInfo}
            />
            
            {/* Check-in & Check-out */}
            <div className="mb-4 grid grid-cols-4 gap-2">

                <FormInput 
                label='Check-in'
                subText='Time to check in' 
                placeholder='06:00' 
                value={checkIn}
                setValue={setCheckIn}
                />
                <FormInput 
                label='Check-out' 
                subText='Time to check out' 
                placeholder='14:00' 
                value={checkOut}
                setValue={setCheckOut}
                />
                <FormInput 
                label='Max guests' 
                subText='Maxium number of occupants' 
                placeholder='3' 
                value={maxGuests}
                setValue={setMaxGuests}
                />
                <FormInput 
                label='Price' 
                subText='Rent per night' 
                placeholder='10,000' 
                value={price}
                setValue={setPrice}
                />


            </div>

            {/* Submit */}
            <button className="primary rounded-3xl hover:opacity-80">
                Save
            </button>

        </form>
      </>
    );
  };
  

export default AddAccomodationPage