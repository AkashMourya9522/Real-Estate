import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



function Signin() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleOnSubmit(e){
    e.preventDefault()
    try {
      if(username==="" || password===""){
        return toast.error("Please Fill in the Details")
      }
      setLoading(true)
      const response = await axios.post('http://localhost:3000/api/auth/signin',{username,password},{withCredentials:true})
      console.log(response);
      
      setLoading(false)
      toast.success("Sign In Successful")
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.errorMessage);
      setLoading(false)
      setError(error.response.data.errorMessage)
    }    
  }

  return (
    <div className='max-w-lg p-5 mx-auto ' >
      <h1 className='text-3xl font-semibold my-5 text-center' >Sign In</h1>
      <form className='flex flex-col gap-8' onSubmit={handleOnSubmit} >
      <input type="text" placeholder='Username' id='username' className='border-2 p-3 rounded-lg' onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder='Password' id='password' className='border-2 p-3 rounded-lg ' onChange={(e)=>setPassword(e.target.value)} />
      <button className='bg-red-500 p-3 rounded-lg text-white font-semibold' disabled={loading} > {loading ? 'Loading...' : 'Sign In'} </button>
      <button className='bg-slate-500 p-3 rounded-lg text-white font-semibold ' >Continue with Google</button>
      </form>
      <div className='flex gap-3 mt-5' >
        <span>Dont have an account?</span>
        <Link to={'/sign-up'}>
        <span className='text-blue-400 hover:underline'  >Sign Up</span>
        </Link>
      </div>
      {error ? <p className='mt-5 text-red-500' >{error}</p> : ""}
    </div>
  )
}

export default Signin