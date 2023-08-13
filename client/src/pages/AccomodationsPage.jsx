import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';

const Accomodation = ({ place }) => {

  const { _id: id, title, description, photos } = place
  return (
    <Link
      to={`./${id}`} 
      className="flex gap-5 p-8 bg-gray-200 rounded-2xl cursor-pointer"
    >
      <img src={photos[0]} alt="" className="h-32 w-60 object-cover rounded-lg shrink-0" />
      <div>
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
          className="primary flex justify-center items-center gap-2 mt-12 mx-auto max-w-sm "
        >
          <AiOutlinePlus />
          <span>Add new place</span>
        </button>

        <div className="flex flex-col gap-5 max-w-3xl mx-auto mt-6">
          {places?.map((place) => <Accomodation key={place._id} place={place} />)}
        </div>

       
    </>
  );
};

export default AccomodationsPage;
