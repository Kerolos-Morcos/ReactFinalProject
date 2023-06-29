import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Card from "../components/nurse-card/Card"
import Card from "../../Components/NurseComponent/nurse-card/Card"
// import { getAllNurses } from '../Redux/Slices/NurseSlice';
import { getAllNurses  } from '../../Redux/Slices/NurseSlice';
// import Header from '../components/Header/Header';
import Header from '../../Components/NurseComponent/Header/Header';
import  Sidebar  from '../../Components/NurseComponent/sidebar/Sidebar'
import './Nurses.css'
import {motion} from 'framer-motion'
import DarkStyle from '../../Components/DarkMode/darkBtn.module.css'


function Nurses() {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getAllNurses());
      const isDarkMode = localStorage.getItem("isDarkMode");
      if (isDarkMode) {
          document.querySelector("#main")?.classList.toggle(DarkStyle["main"], isDarkMode);
      }
    },[])
    const { filteredNerses } = useSelector(state => state.NurseSlice)
    console.log(filteredNerses);
    // const { filter } = useSelector(state => state.NurseSlice)
   return (
    
    <motion.div
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
    >
    {/* <Navbar/> */}
    <Header />
   
    <main id='main' className='d-flex main'>
    <div className="container">
    <div  className='row mt-5 mb-5 nurse-card'>
                 
                 {
                  filteredNerses &&  filteredNerses.map((item, index) => {
                   return <Card  data={item} key={index} />;
                 })
               } 
               

           </div> 
    </div>
     
  <Sidebar/>
    </main>
   
    </motion.div>
   )
}

export default Nurses