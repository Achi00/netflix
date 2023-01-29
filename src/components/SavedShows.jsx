import { useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'


const SavedShows = () => {
    const [movies, setMovies] = useState([])
    const { user } = UserAuth()

    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
      }
      const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
      }

      useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
            setMovies(doc.data()?.savedShows)
        })
      }, [user?.email])

      const movieRef = doc(db, 'users', `${user?.email}`)
      const deleteShow = async (passedID) => {
        try {
           const result = movies.filter(item => item.id !== passedID) 
           await updateDoc(movieRef, {
            savedShows: result
           })
        } catch (error) {
            console.log(error);
        }
      }

  return (
    <>
        <p className='absolute flex gap-5 right-0 text-white font-bold md:text-xl p-4 px-6'>
          <BsPersonCircle size={30}/> {user.email}
        </p>
        <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
        <div className='relative flex items-center group'>
          <MdChevronLeft onClick={slideLeft} className='bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
          <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
            {movies.map((item, id) => (
              <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
              <img className='w-full h-auto block rounded-md' src={`${process.env.REACT_APP_BASE_URL2}${item?.img}`} alt={item?.title} />
              <div className='absolute top-0 left-0 w-full h-full hover:opacity-100 hover:bg-black/80 opacity-0 text-white'>
                <p className='white-space-normal text-xs md:text-sm xs:text-[1px] font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                <p onClick={() => deleteShow(item.id)} className='absolute text-red-600 top-4 right-4'>
                    <AiOutlineClose size={25}/>
                </p>
              </div>
            </div>  
            ))}
          </div>
          <MdChevronRight onClick={slideRight} className='bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
        </div>
    </>
  )
}

export default SavedShows