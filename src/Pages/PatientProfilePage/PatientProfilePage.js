import React from 'react'
import PatientProfileComponent from '../../Components/PatientProfile/PatientProfileComponent'
import {motion} from 'framer-motion'

function PatientProfilePage() {
  return (
    <motion.div
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