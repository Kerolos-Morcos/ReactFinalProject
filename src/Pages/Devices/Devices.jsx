import React, { useEffect } from 'react'
import Header from '../../Components/devicesComponents/Header'
import Sidebar from '../../Components/devicesComponents/Sidebar'
import Card from '../../Components/devicesComponents/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getDevices } from '../../Redux/Slices/DeviceSlice'

function Devices() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDevices())
    },[])
    const {filteredDevices} = useSelector(state => state.DeviceSlice)
    return (
        <>
            <Header />
            <Sidebar />
            <div className='d-flex flex-wrap justify-content-evenly'>{
                filteredDevices.map((dev,index) => {
                    return <Card data={dev} key={index} />
                })
            }
            </div>
        </>
    )
}

export default Devices