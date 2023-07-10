
import React from "react";
import styleSign from '../../Components/SignUp/signup.module.css'
import one from '../../assets/images/Healthprofessionalteam-rafiki.svg'
import two from '../../assets/images/Physical therapy exercise-rafiki.svg'
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import {motion} from 'framer-motion'

function Signup() {

  return (
    <motion.div
    initial={ {opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={ {opacity: 0 }}
      variants={{duration: 0.2}}
      transition={{yoyo: {duration:1}}}
    >

         <Helmet>
             <style>
                {`
                  
                 body {
                    background-image: url(https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80);
                    display: flex;
  background-size: cover;
  /* height: 80vh; */
  color: #263238;
  font-family: "Noto Sans", sans-serif;
  width: 60%;
  margin: 110px auto;
  min-height: 67vh;
  /* padding: auto 6vw; */
  transition: none;
                  }
                `}
            </style>
         </Helmet>
    <section className={styleSign.IntroSection}>
  <header className={styleSign.title}>
    <h1>انضم إلينا كممرض أو مستخدم  </h1>
  </header>
  <div className={styleSign.grid}>
    <label className={styleSign.card}>
   <NavLink to="/SignupNurse">
      <input
        name="plan"
        className={styleSign.radio}
        type="radio"
        style={{display: 'none'}}
       />
       </NavLink>
      <span className={styleSign['plan-details']} aria-hidden="true">
      <div className={styleSign.IntroSVG}>
        <img src={one} alt='' />
      </div>
      <span className={styleSign['plan-cost']}>ممرض</span>
      <div className={styleSign.DescInput}>
        <h2>أنا ممرض/ة ويمكنني العمل من أجل الناس في منازلهم</h2>
      </div>
      </span>
    </label>
    <label className={styleSign.card}>
    <NavLink to="/SignupPatient">
      <input
        name="plan"
          className={styleSign.radio}
        type="radio"
        style={{display: 'none'}}
      />
      </NavLink>
      <span className={styleSign['plan-details']} aria-hidden="true">
      <div className={styleSign.IntroSVG}>
        <img src={two} alt='' />
      </div>
        <span className={styleSign['plan-cost']}>مستخدم</span>
        <div className={styleSign.DescInput}>
        <h2>أنا مستخدم وأحتاج إلى شخص يقوم بالرعاية الطبية اللازمة</h2>
        </div>
      </span>
    </label>
  </div>
  <div className={styleSign['create-acc']}>
    {/* <div className={styleSign['btn-box']}>
      <a href="/" className={styleSign['btn-1']}>
      إنشاء حساب
      </a>
    </div> */}
    <div className={styleSign['login']}>
    هل لديك حساب؟ {" "} 
      <NavLink to="/Login">سجل دخول</NavLink>
    </div>
  </div>
  </section>
</motion.div>

    
  )
}

export default Signup