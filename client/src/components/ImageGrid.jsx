import { FiMapPin } from 'react-icons/fi'
import { BsGrid1X2, BsChevronLeft } from 'react-icons/bs'

import { useState } from 'react';

const ImageGrid = ({ title, photos, address, children }) => {

  const [displayPhotos, setDisplayPhotos] = useState(false)


  {/* Display all photos*/}
  if (displayPhotos && photos) {

    window.scrollTo(0, 0)

    return (
      <div className="bg-white absolute text-black inset-0 min-h-screen py-12 z-50">
        <div className="bg-white max-w-sm sm:max-w-md md:max-w-full mx-auto">
          <button
            onClick={() => setDisplayPhotos(false)} 
            className="fixed top-1 md:top-3 left-2 md:left-16 px-4 py-2 border border-primary rounded-3xl font-light flex items-center gap-2 bg-primary text-white">
            <BsChevronLeft className='h-3 w-3' />
            Back
          </button>
          <div className="grid gap-4 pb-12">
            {
              photos.map(photo => 
                  <img src={photo} key={photo} className='object-cover mx-auto max-h-[75vh] rounded-md' />
                )
            }
          </div>
        </div>
      </div>
    )
  }


    return (
        <>
        <h1 className='text-3xl'>{title}</h1>
        <div className="flex items-center gap-1">
        <FiMapPin />
        <a target='_blank' href={`https://maps.google.com?q=${address}`} className='mt-1 text-gray-600 underline'>{address}</a>
        </div>
        {children}
  
        {/* Image Collage */}
        { photos && (
          <div 
          onClick={() => setDisplayPhotos(true)}  
          className="mt-6 grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-3xl relative mx-auto ">
            <img src={photos[0]} className='aspect-square object-cover cursor-pointer h-full' alt="" />
            <div className='grid grid-cols-1'>
              <img src={photos[1]} alt="" className='aspect-square object-cover cursor-pointer h-full' />
              <img src={photos[2]} alt="" className='aspect-square object-cover relative top-2 cursor-pointer h-full' />
            </div>
            <button 
              className="absolute bg-white rounded-2xl px-4 py-2 flex gap-2 items-center bottom-2 right-2 opacity-90 hover:opacity-100 text-sm cursor-pointer"
            >
              <BsGrid1X2 className='h-4 w-4'/>
              <p className='font-light'>Show all photos</p>
            </button>
  
          </div>
        )}
        </>
    )
}

export default ImageGrid