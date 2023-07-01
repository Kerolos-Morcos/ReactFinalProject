import React from 'react'
import herostyle from '../Hero/herostyle.module.css'
// import'../style.css'
// import hero from '../../assets/aboutImgs/Healthprofessionalteam-rafiki.svg'
import hero from '../../../assets/images/Healthprofessionalteam-rafiki.svg'
import { NavLink } from 'react-router-dom'
import DarkStyle from '../../DarkMode/darkBtn.module.css'
import { useEffect } from 'react'


function Hero() {
  useEffect(()=>{
    // Dark Mode
    const isDarkMode = localStorage.getItem("isDarkMode")
    if(isDarkMode){
      document.querySelector("#AboutHero")?.classList.toggle(DarkStyle["AboutHero"], isDarkMode);
    }
  },[])
  return (
    <>
    <body dir="rtl">

    <div id='AboutHero' className={herostyle.hero_area}>  
       
        <section className={herostyle.hero_section}>
         
                <div className={"container"}>
                  <div className={`${herostyle.row}  ${'row'}`}>
                    <div className={"col-md-7"}>
                      <div className={herostyle.detail_box}>
                        <h1>
                          
                         نحن هنا من اجل صحتك
                        </h1>
                        <p className={herostyle.herop}>
                        مرحبًا بكم في موقعنا الطبي ، نفخر بأن نكون جزءًا من رحلتك نحو العافية والسعادة، حيث نسعى لتوفير المعلومات والأدوات التي تحتاجها للحفاظ على صحتك العامة وعلاج أمراضك بشكل شامل. نحن هنا لنساعدك في اتخاذ قرارات صحية مستنيرة وتحقيق أفضل نتائج صحية ممكنة. انضموا إلينا في هذه الرحلة واستفيدوا من فوائد موقعنا الطبي المتنوعة والموثوقة.
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