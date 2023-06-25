import React from 'react'
import AskDevice from '../../Components/ASk DEvice/AskDev'
import {motion} from 'framer-motion'

function AskDevicePage() {
  return (
    <motion.div
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
    >
    <AskDevice/>
    </motion.div>
  )
}

export default AskDevicePage