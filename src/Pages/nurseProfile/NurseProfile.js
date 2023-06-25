import React from 'react'
import NurseProfile from "../../Components/nurseProfile/NurseProfile"
import {motion} from 'framer-motion'

function NurseProfilePage({Socket}) {
  return (
    <motion.div 
    initial={ {opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={ {opacity: 0 }}
      variants={{duration: 0.2}}
      transition={{yoyo: Infinity}}
  style={{overflow: 'hidden'}}
    >
    <NurseProfile Socket={Socket}/>
    </motion.div>
  )
}

export default NurseProfilePage