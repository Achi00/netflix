import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Img from '../img/bg.jpg'

const Login = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { user, logIn} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try {
            await logIn(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
  return (
    <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover' src={Img} alt="Netflix" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-[25px]">
                <div className="max-w-[320px] mx-auto py-16">
                    <h1 className='text-3xl font-bold'>Sign In</h1>
                    {error ? <p className='p-3 bg-red-700 border my-3 border-solid border-2 border-gray-400 rounded-lg'>{error}</p> : null}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                        <input onChange={e => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded-lg' type="email" placeholder='Email' autoComplete='email'/>
                        <input onChange={e => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded-lg' type="password" placeholder='Password' autoComplete='current-pasword'/>
                        <button className='bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-800 transition ease-in-out duration-250'>Sign In</button>
                        <div className='flex justify-between text-bold items-center text-lg text-gray-500'>
                            <p><input className='mr-2' type="checkbox" />Remember me</p>
                            <Link className='hover:text-gray-400 transition ease-in-out duration-250' to="/login">
                                Need Help?
                            </Link>
                        </div>
                        <p className='py-6'>
                            <span className='text-gray-500 px-2'>
                                New to Netflix?
                            </span>
                            <Link className='hover:text-gray-400 transition ease-in-out duration-250' to="/signup">
                                Sign Up
                            </Link>
                            </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login