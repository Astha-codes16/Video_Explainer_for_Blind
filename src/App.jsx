import React from 'react'
import Home from './pages/Home'

import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/mainPage' element={<Main/>}/>
    </Routes>
    </>
  )
}

export default App