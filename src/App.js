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
import withLoading from './wrappedComponent';
import NotFound from './Components/NotFoundComponent/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { getBlockedPatientById } from './Redux/Slices/PatientSlice';

function App() {
  const HomeWithLoading = withLoading(Home);
  const NursesWithLoading = withLoading(Nurses);
  const CartWithLoading = withLoading(CartComponent);
  const ContactUsWithLoading = withLoading(ContactUs);
  const DevicesWithLoading = withLoading(Devices);
  const AboutWithLoading = withLoading(About);
  const PostsWithLoading = withLoading(Posts);
  const NurseProfilePageWithLoading = withLoading(NurseProfilePage);
  const PatientProfilePageWithLoading = withLoading(PatientProfilePage);
  const DevicedetailsWithLoading = withLoading(Devicedetails);
  const ShowNurseProfileWithLoading = withLoading(ShowNurseProfile);
  const NurseFormWithLoading = withLoading(NurseForm);
  const AskDevicePageWithLoading = withLoading(AskDevicePage);
  const MedArticalWithLoading = withLoading(MedArtical);
  const CheckWithLoading = withLoading(Check);
  const NurseProfileWithLoading = withLoading(NurseProfile);
  // const NavbarWithLoading = withLoading(Navbar);
  // const DarkModeWithLoading = withLoading(DarkMode);
  // const ScrollWithLoading = withLoading(Scroll);
  // const FooterWithLoading = withLoading(Footer);



const [Socket, setSocket] = useState(null)
const [isLoading, setLoading] = useState(true)
const [showRoutes, setShowRoutes] = useState(false)
 

  useEffect(()=>{
     setSocket(io('http://localhost:3500'));
     setTimeout(()=>{
       setShowRoutes(true)
       setLoading(false);
     },1000)
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


  // Blocked Patient
  const dispatch = useDispatch();
  const blockedPatient = useSelector((state) => state.PatientSlice.Blocked);
  console.log(blockedPatient);
  useEffect(() => {
    console.log('dispathc block patient');
      dispatch(getBlockedPatientById())
  }, []);



  return (
    <div className="App">
      {isLoading ?  (
        <LoadingSpinner/>
      ) : (

      <>
      {flag && <Navbar Socket={Socket} />}
      {flag && <DarkMode/>}  
      <Scroll/> 
      <AnimatePresence mode='wait'>
        {showRoutes && (
      <Routes location={location} key={location.pathname}>
        {blockedPatient === true ? (
          <Route path='*' element={<NotFound />} />
        ) : (
          <>
          <Route index path='/Home' element={<HomeWithLoading/>} />
          <Route path='/' element={<Login />} />
          <Route path='/Nurses' element={<NursesWithLoading />} />
          <Route path='/Cart' element={<CartWithLoading />} />
          <Route path='Signup' element={<Signup />} />
          <Route path='SignupNurse' element={<SignupNurseFormik />} />
          <Route path='SignupPatient' element={<SignupPatient />} />
          <Route path='contactUs' element={<ContactUsWithLoading />} />
          <Route path='Devices' element={<DevicesWithLoading />} />
          <Route path='About' element={<AboutWithLoading />} />
          <Route path='/Posts/:postId?/:commentId?' element={<PostsWithLoading Socket={Socket} />} />
          <Route path='nurseProfile' element={<NurseProfilePageWithLoading Socket={Socket} />} />
          <Route path='patientProfile' element={<PatientProfilePageWithLoading />} />
          <Route path="/Devicedetails/:id" element={<DevicedetailsWithLoading />} />
          <Route path="/ShowNurseProfile/:id" element={<ShowNurseProfileWithLoading Socket={Socket} />} />
          <Route path="/FormNurse/:id" element={<NurseFormWithLoading Socket={Socket}/>}/>
          <Route path="/AskDevicePage" element={<AskDevicePageWithLoading />} />
          <Route path="/MedicalArticles" element={<MedArticalWithLoading />} />
          <Route path="/check" element={<CheckWithLoading />} />
          {/* <Route path="/Chat" element={<Chat Socket={Socket} username={username} room={room}/>} /> */}
          <Route path="/NurseProfileComponent" element={<NurseProfileWithLoading Socket={Socket}/>} />
          </>

         )}
 
<Route path='Login' element={<Login />} />
      </Routes>
        )}
      {flag && <Footer />}
    </AnimatePresence>
      </>
      )}
    </div>
      );
}

export default App;