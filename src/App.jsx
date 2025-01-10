import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signout from './pages/Signup'
import Profile from './pages/Profile'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signout/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About />}/>
    </Routes>
  )
}

export default App