import React, { useContext } from 'react'
// import Navbar from '../components/navbar/Navbar'
// import Hero from '../components/homeComponent/hero/Hero'
import Hero from '../../Components/homeComponent/hero/Hero'

// import Services from '../components/homeComponent/ourServices/Services'
import Services from '../../Components/homeComponent/ourServices/Services'

// import TopRated from '../components/homeComponent/topRated/TopRated'
import TopRated from '../../Components/homeComponent/topRated/TopRated'

// import Statistics from '../components/homeComponent/statistics/Statistics'
import Statistics from '../../Components/homeComponent/statistics/Statistics'

// import Footer from '../components/footer/Footer'
import Footer from '../../Components/footer/Footer'

// import Everywhere from '../components/homeComponent/everyWhere/Everywhere'
import Everywhere from '../../Components/homeComponent/everyWhere/Everywhere'


import './home.css'
import { Route, Routes } from 'react-router-dom'
// import { themeContext } from '../components/ConfigContext/DarkMode' 

function Home() {
  return (
    <>
    {/* <Navbar/> */}
    <Hero/>
    <Services/>
    <Everywhere/>
    <TopRated/>
    <Statistics/>
    {/* <Footer/> */}
    </>
  )
}

export default Home