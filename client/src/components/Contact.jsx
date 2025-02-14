import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'


 export default function Contact({listing}) {
    const landLordId = listing.userRef;
    const [landLord,setLandLord] = useState(null)
    const [message,setMessage] = useState("")

    console.log(landLordId);
    useEffect(()=>{
        async function getLandLord(){
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${landLordId}`,{
                    withCredentials:true
                })
                setLandLord(response.data._doc)
            } catch (error) {
                toast.error(error)
            }
            
        }
        getLandLord()
    },[])
   console.log(landLord);
   
    
  return (
    <div className='my-5' >
        {
            landLord && (
                <div className='text-lg font-semibold flex flex-col gap-5' >
                    <p>Contact Owner <span className=' text-green-600 ' >{landLord.username}</span> For Site <span className='font-semibold text-green-700' > {listing.name} </span> </p>
                    <textarea name="message" id="message" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Your Message..'className='p-3 rounded-lg w-full' rows={2} ></textarea>
                    <Link className='bg-slate-600 p-3 rounded-lg text-white text-center uppercase' to={`mailto:${landLord.mail}?subject:Regarding ${listing.name}&body=${message}`}>Send Message</Link>
    
                </div>
            )
        }
        </div>
  )
}
