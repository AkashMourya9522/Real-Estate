import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
import { useEffect } from 'react'



function Signin() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
 const {error,loading} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signInFailure(null)); 
  }, []);

  async function handleOnSubmit(e){
    e.preventDefault()
    try {
      if(username==="" || password===""){
        return toast.error("Please Fill in the Details")
      }
      dispatch(signInStart())
      const response = await axios.post('/api/auth/signin',{username,password},{withCredentials:true})
      if(response.data.success===false){
        dispatch(signInFailure(response.data.message))
        return
      }
      dispatch(signInSuccess(response.data))
      toast.success("Sign In Successful")
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.errorMessage);
      dispatch(signInFailure(error.response.data.errorMessage))
    }    
  }

  return (
    <div className='max-w-lg p-5 mx-auto ' >
      <h1 className='text-3xl font-semibold my-5 text-center' >Sign In</h1>
      <form className='flex flex-col gap-8' onSubmit={handleOnSubmit} >
      <input type="text" placeholder='Username' id='username' className='border-2 p-3 rounded-lg' onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder='Password' id='password' className='border-2 p-3 rounded-lg ' onChange={(e)=>setPassword(e.target.value)} />
      <button className='bg-red-500 p-3 rounded-lg text-white font-semibold' disabled={loading} > {loading ? 'Loading...' : 'Sign In'} </button>
      <OAuth />
      </form>
      <div className='flex gap-3 mt-5' >
        <span>Dont have an account?</span>
        <Link to={'/sign-up'}>
        <span className='text-blue-400 hover:underline'  >Sign Up</span>
        </Link>
      </div>
      {/* {error ? <p className='mt-5 text-red-500' >{error}</p> : ""} */}
    </div>
  )
}

export default Signin