import React, {  useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import {updateUserFailure,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSuccess} from '../redux/user/userSlice.js'
import axios from 'axios'

function Profile() {
  const {_id,username,email,photo} = useSelector(state => state.user.currentUser)
  const {loading,error} = useSelector(state =>state.user)
  const dispatch = useDispatch()
  
  
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [file,setFile] = useState(undefined)
  const [formData,setFormData] = useState({})
  console.log('the user id is',_id);
  async function handleSignout(){
    try {
      const res = await axios.get("http://localhost:3000/api/auth/signout")
      dispatch(signOutSuccess())
    } catch (error) {
      return
    }
    
  }
  async function handleFileUpload(e){
    const data = new FormData()
    setFile(e.target.files[0])
    data.append("file",e.target.files[0])
    data.append("upload_preset","Real_Estate")
    data.append("cloud_name","drjsiga6e")
    
    
    
    if(!e.target.files[0]) return ;
    
    
    
    try{
      const cloudinaryRes =  await axios.post("https://api.cloudinary.com/v1_1/drjsiga6e/image/upload",data)
      
      setFormData({...formData,photo:cloudinaryRes.data.secure_url})
      }catch(err){
      
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

  async function handleFormSubmit(e){
    e.preventDefault()
   
    
    try {
      dispatch(updateUserStart());
      const newUser = await axios.post("http://localhost:3000/api/user/update/"+_id,formData,{
        withCredentials:true
      })
      console.log('updated user data',newUser);
      
      setFormData(newUser.data)
      dispatch(updateUserSuccess(newUser.data))
      toast.success("User Is Updated Successfully!")
      
    } catch (err) {
      toast.error(err)
      dispatch(updateUserFailure(err))
    } 
  }

  async function handleDeleteUser(){
    try {
      dispatch(deleteUserStart())
      const res = await axios.delete("http://localhost:3000/api/user/delete/"+_id,{
        withCredentials:true
      })
      if(res.data.success==false){
        dispatch(deleteUserFailure(res.data.errorMessage))
        return toast.error(res.data.errorMessage)
      }
      else{
        dispatch(deleteUserSuccess())
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      return toast.error(error)
    }
    
  }
  
  return <div className='flex flex-col gap-5 p-3 max-w-lg mx-auto' >
    <h1 className='text-3xl font-medium my-3 text-center' >Profile</h1>

    
    <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
      <input type="file" onChange={handleFileUpload} ref={inputRef} accept='image/*' hidden />
    <img src={ formData.photo || photo} onClick={()=>{inputRef.current.click()}} className='w-28 h-28 rounded-full mx-auto object-cover cursor-pointer' alt="Profile-Image" />
    <input type="text" placeholder='Username' defaultValue={username} value={formData.username } onChange={(e)=>setFormData({...formData,username:e.target.value})}   className='border-2 rounded p-3' />
    <input type="email" placeholder='Email' defaultValue={email} value={formData.email } onChange={(e)=>setFormData({...formData,email:e.target.value})}  className='border-2 rounded p-3' />
    <input type="password" placeholder='Password'  value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} className='border-2 rounded p-3'  />

    <button disabled= {loading} className='bg-slate-500 p-3 rounded-md text-white uppercase hover:opacity-90' > {loading ? 'Loading' : 'Update'} </button>
    {/* <button className='bg-green-500 p-3 rounded-md text-white uppercase' >Create Listing</button> */}
    </form>
    <div className='flex justify-between mt-3' >
      <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer' >Delete Account</span>
      <span className='text-red-600 cursor-pointer' onClick={handleSignout} > Sign Out </span>
    </div>
    </div>
}

export default Profile