import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import FoodPartnerSignup from '../pages/FoodPartnerSignup'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import { Toaster } from 'react-hot-toast'
import HomePage from '../pages/HomaPage'
import PartnerHome from '../pages/PartnerHome'
import PartnerProfile from '../pages/PartnerProfile'

const App = () => {
  return (
      <>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/foodPartnerSignup' element={<FoodPartnerSignup />} />
          <Route path='/foodPartnerLogin' element={<FoodPartnerLogin />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/partner-home/:id' element={<PartnerHome />} />
          <Route path='/partner/:id' element={<PartnerProfile />} />
        </Routes>

        <Toaster />
      </>
  )
}

export default App