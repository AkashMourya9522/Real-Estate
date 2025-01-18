import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {username,email,photo} = useSelector(state => state.user.currentUser)
  return <div className='flex flex-col gap-5 p-3 max-w-lg mx-auto' >
    <h1 className='text-3xl font-medium my-3 text-center' >Profile</h1>

    
    <form className='flex flex-col gap-5'>
    <img src={photo} className='w-20 h-20 rounded-full mx-auto object-cover cursor-pointer' alt="Profile-Image" />
    <input type="text" placeholder='Username'  value={username} className='border-2 rounded p-3' />
    <input type="email" placeholder='Email' value={email} className='border-2 rounded p-3' />
    <input type="password" placeholder='Password' className='border-2 rounded p-3'  />

    <button className='bg-slate-500 p-3 rounded-md text-white uppercase hover:opacity-90' >Update</button>
    <button className='bg-green-500 p-3 rounded-md text-white uppercase' >Create Listing</button>
    </form>
    <div className='flex justify-between mt-3' >
      <span className='text-red-600 cursor-pointer' >Delete Account</span>
      <span className='text-red-600 cursor-pointer' > Sign Out </span>
    </div>
    </div>
}

export default Profile