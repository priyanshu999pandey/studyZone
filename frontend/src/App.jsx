import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <>
   <Routes>
    <Route path='/' element={<Home></Home>} />
    <Route path='/login' element={<Login></Login>} />
    <Route path='/signup' element={<SignUp></SignUp>} />
   </Routes>
    </>
  )
} 

export default App