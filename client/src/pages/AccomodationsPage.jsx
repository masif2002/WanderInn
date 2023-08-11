import { AiOutlinePlus, AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { FiUpload } from 'react-icons/fi';
import { MdPets } from 'react-icons/md'
import { PiSwimmingPoolDuotone, PiTelevisionSimpleLight } from 'react-icons/pi'
import { BiSolidParking } from 'react-icons/bi'

import { useNavigate, useParams } from "react-router-dom";
import { Perk } from '../components'


const FormInput = ({ label, subText, textBox=false, placeholder, inputStyle }) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="font-semibold text-xl ml-3">{label}</label>
            <p className="ml-3 text-sm text-gray-400">{subText}</p>
            {!textBox && <input type="text" className={inputStyle || "rounded-3xl"} placeholder={placeholder} />}
            {textBox && <textarea className="rounded-lg" />}
        </div>

    )
}

const AccomodationsPage = () => {
  const navigate = useNavigate();
  const { action } = useParams();

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
                
                <FormInput label='Title' subText='Text that is displayed to the users on the front page' />
                <FormInput label='Description' subText='Description of the place, the ambience, nearby stores, etc... ' />
                <FormInput label='Address' subText='Address of the place and some nearby popular landmarks if any' />

                {/* Photos */}
                <div className="mb-4">
                    <label htmlFor="" className="font-semibold text-xl ml-3"> Photos</label>
                    <p className="ml-3 text-sm text-gray-400">Nice photos of the place with good lighting and full coverage</p>
                    
                    <div className="flex border border-gray-400 rounded-3xl">
                        <input type="text" className="border-none focus:outline-none rounded-3xl" placeholder="Photo as URL ..."/>
                        <button className="bg-primary text-white rounded-tr-3xl rounded-br-3xl w-44">Add Photo</button>
                    </div>

                    <div className="grid grid-cols-3">
                        <button className="mt-3 gap-2 flex justify-center items-center h-32 border border-gray-400 rounded-3xl text-gray-800">
                            <FiUpload className="h-5 w-5"/>
                            <p >Upload Photos</p>
                        </button>
                    </div>
                </div>

                {/* Perks */}
                <div className="mb-4">
                    <label htmlFor="" className="font-semibold text-xl ml-3">Perks</label>
                    <p className="ml-3 text-sm text-gray-400">Choose the perks that are available in your place</p>

                    <div className="grid grid-cols-3 gap-2">

                        <Perk name="wifi" Icon={AiOutlineWifi} />
                        <Perk name="parking" Icon={BiSolidParking} />
                        <Perk name="pets" Icon={MdPets} />
                        <Perk name="Swimming pool" Icon={PiSwimmingPoolDuotone} />
                        <Perk name="TV" Icon={PiTelevisionSimpleLight} />
                        <Perk name="valet" Icon={AiOutlineCar} />
                       
                    </div>
                </div>

                {/* Extrainfo */}
                <FormInput label='Extra Info' subText='Any extra information that you would like your clients to know' textBox={true} />
                
                {/* Check-in & Check-out */}
                <div className="mb-4 grid grid-cols-3 gap-2">

                    <FormInput label='Check-in' subText='Time to check in' placeholder='06:00' inputStyle={'rounded-lg'} />
                    <FormInput label='Check-out' subText='Time to check out' placeholder='14:00' inputStyle={'rounded-lg'}/>
                    <FormInput label='Max guests' subText='Maxium number of occupants' placeholder='3' inputStyle={'rounded-lg'}/>

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
