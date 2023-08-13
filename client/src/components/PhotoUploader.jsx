import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'

import axios from "axios";
import { useEffect } from 'react';

const PhotoUploader = ({ uploadedPhotos, setUploadedPhotos }) => {

    
    const [photoLink, setPhotoLink] = useState('')

    const addPhotoByLink = (ev) => {
        ev.preventDefault()
    
        axios.post('/upload-by-link', {link: photoLink})
        .then(({ data }) => {
            let newURL = axios.defaults.baseURL + '/' + data.filename
            setUploadedPhotos((prev) => [...prev, newURL])
            setPhotoLink('')
        })
        .catch((err) => {
            alert("Oops! Something went wrong!")
            console.log(err);
        })
    
      }
    
    const uploadPhoto = async (ev) => {
        const { files } = ev.target

        axios.post('upload-photos', files)
        .then(({ data }) => {
            const newPhotos = data.map((URL) => axios.defaults.baseURL + URL)
            setUploadedPhotos((prev) => [...prev, ...newPhotos])
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong!")
        })
    }

    const removePhoto = (currentPhoto) => {
        setUploadedPhotos([...uploadedPhotos.filter((photo) => photo !== currentPhoto)])
    }

    const setCoverPhoto = (currentPhoto) => {
        setUploadedPhotos([currentPhoto, ...uploadedPhotos.filter((photo) => photo !== currentPhoto)])
    }

  return (
    <>
        <div className="mb-4">
            <label htmlFor="" className="font-semibold text-xl ml-3"> Photos</label>
            <p className="ml-3 text-sm text-gray-400">Nice photos of the place with good lighting and full coverage</p>
            
            <div className="flex border border-gray-400 rounded-3xl">
                <input 
                    type="text"
                    className="border-none focus:outline-none rounded-3xl"
                    placeholder="Photo as URL ..."
                    onChange={(e) => setPhotoLink(e.target.value)}
                    value={photoLink}
                />
                <button className="bg-primary text-white rounded-tr-3xl rounded-br-3xl w-44" onClick={addPhotoByLink}>Add Photo</button>
            </div>


            <div className="grid grid-cols-3 mt-3 gap-2">
            
                {uploadedPhotos.map((url) => 
                    <div className='relative' key={url}>
                        <img  src={url} alt="upload" className="rounded-3xl w-full object-cover h-48" />
                        <BsTrash3Fill className=" absolute z-10 top-2 right-2 p-1 bg-white rounded-full h-5 w-5 cursor-pointer" onClick={() => removePhoto(url)} />
                        
                        {
                            url === uploadedPhotos[0] ? 
                                <AiFillStar className='absolute top-2 left-2 p-1 h-5 w-5 z-10 bg-white rounded-full cursor-pointer'/> 
                                : 
                                <AiOutlineStar 
                                    className='absolute top-2 left-2 p-1 h-5 w-5 z-10 bg-white rounded-full cursor-pointer' 
                                    onClick={() => setCoverPhoto(url)}
                                    />
                        }
                    </div>
                )}
                
                <label className="cursor-pointer flex justify-center items-center gap-2 border border-gray-400 rounded-3xl text-gray-800 min-h-[100px]">
                    <input type="file" className="hidden" multiple onChange={uploadPhoto} />
                    <FiUpload className="h-5 w-5"/>
                    <p >Upload Photos</p>
                </label>
            </div>
         </div>
    </>
  )
}

export default PhotoUploader