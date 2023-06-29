import React, { useEffect } from 'react'
import Header from '../../Components/devicesComponents/Header'
import Sidebar from '../../Components/devicesComponents/Sidebar'
import Card from '../../Components/devicesComponents/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getDevices } from '../../Redux/Slices/DeviceSlice'
import {motion} from 'framer-motion'
import DarkStyle from '../../Components/DarkMode/darkBtn.module.css'
import Fade from 'react-reveal/Fade'

function Devices() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDevices())
        const isDarkMode = localStorage.getItem("isDarkMode");
        if (isDarkMode) {
            document.querySelector("#Device")?.classList.toggle(DarkStyle["sidebarFilterSearch"], isDarkMode);
            document.querySelector("#DeviceCard")?.classList.toggle(DarkStyle["sidebarFilterSearch"], isDarkMode);
        }
    },[])
    const {filteredDevices} = useSelector(state => state.DeviceSlice)
    return (
        <motion.div id='Device'
        initial={ {opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={ {opacity: 0 }}
        variants={{duration: 0.2}}
        transition={{yoyo: Infinity}}
    style={{overflow: 'hidden'}}
        >
            <Fade top distance="10%" duration={1500}>

            <Header />
            </Fade>
            <Sidebar />
            <div id='DeviceCard' className='d-flex flex-wrap justify-content-evenly'>{
                filteredDevices.map((dev,index) => {
                    return <Card data={dev} key={index} />
                })
            }
            </div>
        </motion.div>
    )
}

export default Devices