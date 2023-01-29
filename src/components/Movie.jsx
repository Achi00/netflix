import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const Movie = ({ item }) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = UserAuth()
    const movieId = doc(db, 'users', `${user?.email}`)

    const saveShow = async() => {
      if (user?.email) {
        setLike(!like)
        setSaved(true)
        await updateDoc(movieId, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path
          })
        })
      } else {
        return (
          swal("Error", "Please log in to save a movie", "error")
        )
      }
    }

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img className='w-full h-auto block rounded-md' src={`${process.env.REACT_APP_BASE_URL2}${item?.backdrop_path}`} alt={item?.title} />
      <div className='absolute top-0 left-0 w-full h-full hover:opacity-100 hover:bg-black/80 opacity-0 text-white'>
        <p className='white-space-normal text-xs md:text-sm xs:text-[1px] font-bold flex justify-center items-center h-full text-center'>
          {item?.title}
        </p>           
        <p onClick={saveShow} className='text-xs md:text-sm'>
          {like ? <FaHeart size="25px" className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart size="25px" className='absolute top-4 left-4 text-gray-300' />}  
        </p> 
        <p className='absolute top-4 gap-1 right-4 flex flex-row text-yellow-400 text-xs md:text-sm'>
            <AiOutlineStar className='relative top-1 right-4'/>
            <p className='relative right-4'>{item?.vote_average}</p>
        </p>  
        <p className='absolute top-[70%] right-4  text-gray-400'>
            {item?.release_date}
        </p>
        <p className='absolute top-[70%] left-4 capitalize  text-gray-400'>
            {item?.original_language} 
        </p>
      </div>
    </div>
  )
}

export default Movie