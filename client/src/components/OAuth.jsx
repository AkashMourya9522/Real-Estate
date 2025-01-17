import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {app} from '../firebase'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleGoogleClick(){
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result.user);
            const userData = await axios.post('http://localhost:3000/api/auth/google',{
                username:result.user.displayName,
                email:result.user.email,
                photoURL:result.user.photoURL
            })
            dispatch(signInSuccess(userData.data))
            navigate('/')
            
        } catch (error) {
            console.log('Error with google sign In',error);
            
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className="bg-slate-500 text-white font-semibold p-3 rounded-lg hover:opacity-95">
          CONTINUE WITH GOOGLE
        </button>
  )
}
