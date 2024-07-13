import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import { useState } from 'react'

import LogingPop from './components/PopLogin/LoginPop'

function App() {
  const [showlogin,setshowlogin]=useState(false);
  return (
   
  
  <div className="app">
    {showlogin?<LogingPop setshowlogin={setshowlogin} />:<></>}
    <Navbar setshowlogin={setshowlogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coin/:coinId' element={<Coin/>}/>
 
      <Route path='/about' element={<About/>}/>

    </Routes>
    <Footer/>
  </div>
  )
}

export default App
