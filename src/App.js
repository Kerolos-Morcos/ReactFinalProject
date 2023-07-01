import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import Navbar from './Components/Nabar/NavbarComponent';
import Nurses from './Pages/Nurses/Nurses';
import FormNurse from './Pages/NurseForm/NurseForm';
import Devices from './Pages/Devices/Devices'
import ContactUs from './Pages/ContactUs/ContactUs'
import AskDevicePage from './Pages/AskDevice/AskDevice';
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup';
import SignupPatientFormik from './Pages/SignUpPatient/SignUpPatient';
import SignupNurseFormik from './Pages/SignUpNurse/SignupNurseFormik';
import NurseForm from './Pages/NurseForm/NurseForm';
import SignupPatient from './Pages/SignUpPatient/SignUpPatient';
import Home from './Pages/Home/Home';
import Footer from './Components/footer/Footer';
import Scroll from './Components/ScrollToTop/Scroll';
import { useEffect, useState } from 'react';
import CartComponent from './Components/Cart/Cart';
import About from './Pages/AboutPage/About';
import Posts from './Components/Posts/Post';
import NurseProfilePage from './Pages/nurseProfile/NurseProfile';
import PatientProfilePage from './Pages/PatientProfilePage/PatientProfilePage';
import Devicedetails from './Components/DeviceDetails/Devicedetails';
import NurseProfileShowPage from './Pages/ShowNurseProfile/NurseProfileShowPage';
import ShowNurseProfile from './Components/showNurseProfile/ShowNurseProfile';
import MedArtical from './Components/Articles/MedArtical';
// import DeviceDetailsPage from './Pages/DeviceDetails/DeviceDetails';
import {AnimatePresence} from 'framer-motion'
import Check from './Pages/Checkout/Check';
import NurseProfile from './Components/nurseProfile/NurseProfile';
import DarkMode from './Components/DarkMode/DarkBTN';

// Socket IO
import { io } from "socket.io-client";
import Chat from './Components/ChatComponent/Chat';
import LoadingSpinner from './Components/Spinner/Spinner';

function App() {
const [Socket, setSocket] = useState(null)
const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
     setSocket(io('http://localhost:3500'));
     setTimeout(()=>{
       setLoading(false);
     },2000)
  },[]);



  const [flag,setFlag]=useState(false);
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split('/')[1];
    if (page !== 'Signup' && page !== 'SignupNurse' && page !== 'SignupPatient' && page !== 'Login' && page !=="") {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [location]);




  return (
      isLoading ?  (
        <LoadingSpinner/>
      ) : (

        <div className="App">
      
      {flag && <Navbar Socket={Socket} />}
      {flag && <DarkMode/>}  
      <Scroll/> 
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route index path='/Home' element={<Home/>} />
        <Route path='/' element={<Login />} />
        <Route path='/Nurses' element={<Nurses />} />
        <Route path='/Cart' element={<CartComponent />} />
        <Route path='Login' element={<Login />} />
        <Route path='Signup' element={<Signup />} />
        <Route path='SignupNurse' element={<SignupNurseFormik />} />
        <Route path='SignupPatient' element={<SignupPatient />} />
        <Route path='contactUs' element={<ContactUs />} />
        <Route path='Devices' element={<Devices />} />
        <Route path='About' element={<About />} />
        <Route path='Posts' element={<Posts Socket={Socket} />} />
        <Route path='nurseProfile' element={<NurseProfilePage Socket={Socket} />} />
        <Route path='patientProfile' element={<PatientProfilePage />} />
        <Route path="/Devicedetails/:id" element={<Devicedetails />} />
        <Route path="/ShowNurseProfile/:id" element={<ShowNurseProfile Socket={Socket} />} />
        <Route path="/FormNurse/:id" element={<NurseForm Socket={Socket}/>}/>
        <Route path="/AskDevicePage" element={<AskDevicePage />} />
        <Route path="/MedicalArticles" element={<MedArtical />} />
        <Route path="/check" element={<Check />} />
        {/* <Route path="/Chat" element={<Chat Socket={Socket} username={username} room={room}/>} /> */}
        <Route path="/NurseProfileComponent" element={<NurseProfile Socket={Socket}/>} />

      </Routes>
      {flag && <Footer />}
    </AnimatePresence>
    </div>
      )
  );
}

export default App;