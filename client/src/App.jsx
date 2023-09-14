import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {LoginPage,SignupPage, HomePage, ActivationPage} from './Routes/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App