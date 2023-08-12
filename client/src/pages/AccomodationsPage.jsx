import { AiOutlinePlus, AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { MdPets } from 'react-icons/md'
import { PiSwimmingPoolDuotone, PiTelevisionSimpleLight } from 'react-icons/pi'
import { BiSolidParking } from 'react-icons/bi'

import { useNavigate, useParams } from "react-router-dom";
import { Perk, PhotoUploader } from '../components'
import { useState } from "react";


const FormInput = ({ label, subText, textBox=false, placeholder, inputStyle, value, setValue }) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="font-semibold text-xl ml-3">{label}</label>
            <p className="ml-3 text-sm text-gray-400">{subText}</p>
            {!textBox && 
              <input 
                type="text" 
                className={inputStyle || "rounded-2xl"}
                placeholder={placeholder} 
                value={value}
                onChange={(ev) => {
                  setValue(ev.target.value)
                }}
              />}
            {textBox && 
              <textarea 
                className="rounded-lg" 
                value={value}
                onChange={(ev) => {
                  setValue(ev.target.value)
                }}
              />}
        </div>

    )
}

const AccomodationsPage = () => {
  const navigate = useNavigate();
  const { action } = useParams();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState('')


  return (
    <>
      {action != "new" && (
        <button
          onClick={() => navigate("./new")}
          className="primary flex justify-center items-center gap-2 mt-12 mx-auto max-w-sm "
        >
          <AiOutlinePlus />
          <span>Add new place</span>
        </button>
      )}

      {
        action == 'new' && (
            <form className="mt-10 py-5 px-10 max-w-3xl mx-auto mb-64">
                
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
                <PhotoUploader />

                {/* Perks */}
                <div className="mb-4">
                    <label htmlFor="" className="font-semibold text-xl ml-3">Perks</label>
                    <p className="ml-3 text-sm text-gray-400">Choose the perks that are available in your place</p>

                    <div className="grid grid-cols-3 gap-2">

                        <Perk name="wifi" Icon={AiOutlineWifi} choosePerk={setPerks}/>
                        <Perk name="parking" Icon={BiSolidParking} choosePerk={setPerks}/>
                        <Perk name="pets" Icon={MdPets} choosePerk={setPerks}/>
                        <Perk name="Swimming pool" Icon={PiSwimmingPoolDuotone} choosePerk={setPerks}/>
                        <Perk name="TV" Icon={PiTelevisionSimpleLight} choosePerk={setPerks}/>
                        <Perk name="valet" Icon={AiOutlineCar} choosePerk={setPerks}/>
                       
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
                <div className="mb-4 grid grid-cols-3 gap-2">

                    <FormInput 
                      label='Check-in'
                      subText='Time to check in' 
                      placeholder='06:00' 
                      inputStyle={'rounded-lg'} 
                      value={checkIn}
                      setValue={setCheckIn}
                    />
                    <FormInput 
                      label='Check-out' 
                      subText='Time to check out' 
                      placeholder='14:00' 
                      inputStyle={'rounded-lg'}
                      value={checkOut}
                      setValue={setCheckOut}
                    />
                    <FormInput 
                      label='Max guests' 
                      subText='Maxium number of occupants' 
                      placeholder='3' 
                      inputStyle={'rounded-lg'}
                      value={maxGuests}
                      setValue={setMaxGuests}
                    />

                </div>

                {/* Submit */}
                <button className="primary hover:opacity-80">
                    Save
                </button>

            </form>
        )
      }
    </>
  );
};

export default AccomodationsPage;
