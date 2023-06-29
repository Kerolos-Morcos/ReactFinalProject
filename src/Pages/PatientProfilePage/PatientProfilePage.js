import React, { useEffect } from 'react'
import PatientProfileComponent from '../../Components/PatientProfile/PatientProfileComponent'
import {motion} from 'framer-motion'
import DarkStyle from '../../Components/DarkMode/darkBtn.module.css'

function PatientProfilePage() {
  useEffect(()=>{
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#PatientPage")?.classList.toggle(DarkStyle["PatientPage"], isDarkMode);
    }
  },[])
  return (
    <motion.div id='PatientPage'
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
    >
<PatientProfileComponent/>
    </motion.div>
  )
}

export default PatientProfilePage