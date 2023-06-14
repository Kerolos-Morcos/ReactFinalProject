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
import { Navbar } from 'react-bootstrap';
function Nurses() {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getAllNurses());
    },[])
    const { filteredNerses } = useSelector(state => state.NurseSlice)
    console.log(filteredNerses);
    // const { filter } = useSelector(state => state.NurseSlice)
   return (
    
    <>
    {/* <Navbar/> */}
    <Header />
   
    <main className='d-flex main'>
    <div className="container">
    <div className='row mt-5 nurse-card'>
                 
                 {
                  filteredNerses &&  filteredNerses.map((item, index) => {
                   return <Card data={item} key={index} />;
                 })
               } 
               

           </div> 
    </div>
     
  <Sidebar/>
    </main>
   
    </>
   )
}

export default Nurses