import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places')
      // Destructuring places from data
      .then(({ data: { placesList } }) => setPlaces(placesList))
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8 bg-gray-100 px-16 md:px-32 py-16 grow' >

      {
        places.map((place) => 
        <Link 
          key={place._id}
          to={`/place/${place._id}`} className='outline-none bg-white '>
          <img src={place.photos[0]} className='rounded-t-3xl object-cover aspect-square' />
          <div className="py-4 px-6">
            <h3 className='text-lg font-medium truncate '>{place.address}</h3>
            <p className='text-sm text-gray-600 truncate font-light'>{place.title}</p>
            <p className='mt-1.5'>
              <span className='text-lg font-medium'>₹{place.price}</span>
              <span className='text-sm text-gray-500 font-light'> per night</span>
            </p>
          </div>
        </Link> )
      }

    </div>
  )
}

export default HomePage