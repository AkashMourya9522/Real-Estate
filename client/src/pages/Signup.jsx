import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-semibold text-center my-7' >SignUp</h1>
      <form className='flex flex-col gap-7' >
        <input id='username' type="text" placeholder='Username' className='p-3  border-2 rounded-lg ' />
        <input id='email' type="text" placeholder='Email' className='p-3  border-2 rounded-lg '/>
        <input id='password' type="password" placeholder='Password' className='p-3 border-2 rounded-lg '/>
        <button className='bg-red-500 text-white font-semibold p-3 rounded-lg hover:opacity-95' >SIGN UP</button>
        <button className='bg-slate-500 text-white font-semibold p-3 rounded-lg hover:opacity-95' >CONTINUE WITH GOOGLE</button>
      </form>
      <div className='flex gap-3 mt-5' >
        <p>Have an account?</p>
        <Link to={'/'} >
        <span className='text-blue-500 hover:underline' >
        Signin
        </span>
        
        </Link>
      </div>
    </div>
  )
}

export default Signup