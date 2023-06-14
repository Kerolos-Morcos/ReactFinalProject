import React from 'react'
import herostyle from '../Hero/herostyle.module.css'
// import'../style.css'
// import hero from '../../assets/aboutImgs/Healthprofessionalteam-rafiki.svg'
import hero from '../../../assets/images/Healthprofessionalteam-rafiki.svg'
import { NavLink } from 'react-router-dom'




function Hero() {
  return (
    <>
    <body dir="rtl">
    <div className={herostyle.hero_area}>  
       
        <section className={herostyle.hero_section}>
         
                <div className={"container"}>
                  <div className={`${herostyle.row}  ${'row'}`}>
                    <div className={"col-md-7"}>
                      <div className={herostyle.detail_box}>
                        <h1>
                          
                         نحن هنا من اجل صحتك
                        </h1>
                        <p className={herostyle.herop}>
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ex laborum aut, modi ratione veniam saepe enim, harum aliquam nesciunt exercitationem facere optio iusto consequuntur quia? Magni similique voluptatum aliquid?
                        </p>
                        <div className={`${herostyle.btn_box} ${"text-center"}`}>
                          <NavLink to="/Nurses" className={herostyle.btn_1} >
                                  احجز خدمة                          
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className={"col-md-5"}>
                      <div className={herostyle.img_box}>
                        <img src={hero} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
              </div>
              </body>
              </>
  )
}

export default Hero