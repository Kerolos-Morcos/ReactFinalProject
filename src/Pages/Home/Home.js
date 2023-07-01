import React, { useContext } from 'react'
import Hero from '../../Components/homeComponent/hero/Hero'
import Services from '../../Components/homeComponent/ourServices/Services'
import TopRated from '../../Components/homeComponent/topRated/TopRated'
import Statistics from '../../Components/homeComponent/statistics/Statistics'
import Everywhere from '../../Components/homeComponent/everyWhere/Everywhere'
import './home.css'
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

    <Hero/>
    <Services/>
    <Everywhere/>
    <TopRated/>
       </Fade>
    <Statistics/>
    </motion.div>
  )
}

export default Home