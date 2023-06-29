import React from "react";
import LoginStyle from '../../Components/Login/logintry.module.css'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import userImg from '../../assets/images/doctor.png'
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// End Toastify
import {motion} from 'framer-motion'

export default function Login() {




  const navigate = useNavigate();
 const formik = useFormik({
  initialValues:
  {
    email: '',
    password: ''
  },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('بريد إلكتروني غير صالح').required("البريد الإلكتروني مطلوب"),
        password: Yup.string().required("كلمة السر مطلوبة")
        }),
        
  onSubmit: (values) => {
    console.log(values);
    axios.post('http://localhost:3500/patient/login',values)
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.data))
            console.log(res.data.data);
            navigate('/Home')
            }
            else {
              console.log(res.data.message)
              // navigate('/Login')
              const notify = () =>
              toast.error(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { textAlign: "center" },
                });
                notify();
              }
              });
              }
              });
         
  return (
    <motion.div
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: {duration:1}}}
    style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: '100vh',
    }}
    >
     <Helmet>
             <style>
                {`
                 body {
                    background-image: url(https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80);
                    direction: rtl;
                    background-repeat: no-repeat;
                    background-size: cover;
                    height: 100vh;
                      transition: none;
                  }
                `}
            </style>
      </Helmet>
         <>
         <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
className={LoginStyle.Toastify}
/>
         <main className={LoginStyle["main_css"]}>
  <div className={LoginStyle["container_form"]}>
    <form className={LoginStyle["form_css"]}  onSubmit={formik.handleSubmit}>
      <img src={userImg} />
      <br />
     
      <input type="text" placeholder="البريد الالكترونى" name="email" onChange={formik.handleChange} 
      onBlur={()=> 
        { 
          formik.setTouched({email:true}) 
        }}
      
      />
      {formik.touched.email && (
              <small id="emailHelp" style={{ color: "red", fontSize: '17px'}}>
                {formik.errors.email}
              </small>
            )}
      <br />
      <input type="password" placeholder="كلمة المرور"  name="password" onChange={formik.handleChange}
        onBlur={()=> 
          { 
            formik.setTouched({password:true}) 
          }}
      />
      {formik.touched.password && (
              <small id="emailHelp" style={{ color: "red", fontSize: '17px'}}>
                {formik.errors.password}
              </small>
            )}
      <br />
      <input type="submit"  defaultValue="SIGN IN" value='تسجيل الدخول' />
     
      <br />
      <div className={LoginStyle.txt2}>
              <span className="ms-auto"> مستخدم جديد؟  {" "}</span>
              <NavLink to="/Signup" style={{fontSize: '15px'}} className="pe-1">
                سجل معنا الان
              </NavLink>
            </div>
    </form>
  </div>
</main>

</>

  </motion.div>
  
  )
}

