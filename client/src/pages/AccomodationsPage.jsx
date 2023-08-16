import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';

const Accomodation = ({ place }) => {

  const { _id: id, title, description, photos } = place
  return (
    <Link
      to={`./${id}`} 
      className="md:flex md:items-center gap-5 md:p-5 bg-gray-200 rounded-2xl cursor-pointer overflow-hidden"
    >
      <img src={photos[0]} alt="" className="md:h-32 w-full md:w-60 object-cover rounded-lg shrink-0" />
      <div className="p-6">
        <h1 className="text-lg font-semibold">
          {
            title.length > 45 ? 
              title.slice(0, 45) + '...' :
              title
          }
        </h1>
        <p className="mt-2 text-sm">
          {
            description.length > 250 ? 
              description.slice(0, 250) + '...' :
              description
          }
        </p>
      </div>
    </Link>
  )
}


const AccomodationsPage = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/myplace')
    .then(({ data }) => setPlaces(data))
    .catch((err) => {
      console.log(err)
      alert("Oops! Something went wrong!")
    })
  }, [])

  return (
    <>  
        <button
          onClick={() => navigate("./new")}
          className="primary rounded-3xl flex justify-center items-center gap-2 mt-12 mx-auto max-w-sm "
        >
          <AiOutlinePlus />
          <span>Add new place</span>
        </button>

        <div className="flex flex-col gap-10 md:gap-5 max-w-sm sm:max-w-md md:max-w-3xl mx-auto mt-6">
          {places?.map((place) => <Accomodation key={place._id} place={place} />)}
        </div>

       
    </>
  );
};

export default AccomodationsPage;
