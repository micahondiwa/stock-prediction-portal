/*import { useState } from 'react'*/

import './assets/css/style.css'
import Main from './components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
