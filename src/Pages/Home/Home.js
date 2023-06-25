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
import {motion} from 'framer-motion'
import Fade from 'react-reveal/Fade'

function Home() {
  return (
    <motion.div
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
    >
      <Fade bottom distance="10%" duration={1500}>

    {/* <Navbar/> */}
    <Hero/>
    <Services/>
    <Everywhere/>
    <TopRated/>
    <Statistics/>
    {/* <Footer/> */}
      </Fade>
    </motion.div>
  )
}

export default Home