import React from 'react'
import { Routes, Route } from "react-router-dom"

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LaunchesPage from './pages/LaunchesPage'

const App = () => {
  return (
    <div className="App">
      {/* <Menu /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App