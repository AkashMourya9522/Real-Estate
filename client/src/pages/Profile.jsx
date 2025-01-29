import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Profile() {
  const {username,email,photo} = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [file,setFile] = useState(undefined)
  const [formData,setFormData] = useState({})
  console.log(formData);
  
  function handleSignout(){
    localStorage.removeItem('persist:root')
    navigate('/sign-in')
  }
  async function handleFileUpload(e){
    const data = new FormData()
    setFile(e.target.files[0])
    data.append("file",e.target.files[0])
    data.append("upload_preset","Real_Estate")
    data.append("cloud_name","drjsiga6e")
    
    console.log(e.target.files[0]);
    
    if(!e.target.files[0]) return ;
    
    
    
    try{
      const cloudinaryRes =  await axios.post("https://api.cloudinary.com/v1_1/drjsiga6e/image/upload",data)
      
      setFormData({...formData,photo:cloudinaryRes.data.secure_url})
      console.log(cloudinaryRes.data.secure_url);
      console.log(formData);
      
    }catch(err){
      console.log("There is an issue i guess")
      return toast.error("There is an issue with the cloudinary service!")
    }
      
  
  }
  // useEffect(()=>{
  //   async ()=>{
  //     const cloudinaryRes =  await axios.post("https://api.cloudinary.com/v1_1/drjsiga6e/image/upload",data)
  //     console.log(cloudinaryRes.data.secure_url);
      
  //   }
  // },[file])
  // console.log(file);
  
  return <div className='flex flex-col gap-5 p-3 max-w-lg mx-auto' >
    <h1 className='text-3xl font-medium my-3 text-center' >Profile</h1>

    
    <form className='flex flex-col gap-5'>
      <input type="file" onChange={handleFileUpload} ref={inputRef} accept='image/*' hidden />
    <img src={ formData.photo || photo} onClick={()=>{inputRef.current.click()}} className='w-28 h-28 rounded-full mx-auto object-cover cursor-pointer' alt="Profile-Image" />
    <input type="text" placeholder='Username' onChange={(e)=>setFormData({...formData,username:e.target.value})}   className='border-2 rounded p-3' />
    <input type="email" placeholder='Email' onChange={(e)=>setFormData({...formData,email:e.target.value})}  className='border-2 rounded p-3' />
    <input type="password" placeholder='Password' onChange={(e)=>setFormData({...formData,password:e.target.value})} className='border-2 rounded p-3'  />

    <button className='bg-slate-500 p-3 rounded-md text-white uppercase hover:opacity-90' >Update</button>
    <button className='bg-green-500 p-3 rounded-md text-white uppercase' >Create Listing</button>
    </form>
    <div className='flex justify-between mt-3' >
      <span className='text-red-600 cursor-pointer' >Delete Account</span>
      <span className='text-red-600 cursor-pointer' onClick={handleSignout} > Sign Out </span>
    </div>
    </div>
}

export default Profile