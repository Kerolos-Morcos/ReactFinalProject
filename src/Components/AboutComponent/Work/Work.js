import React from 'react'
import workstyle from '../Work/workstyle.module.css' 
import one from "../../../assets/images/aboutImgs/edit.png"
import two from "../../../assets/images/aboutImgs/medical-team.png"
import three from"../../../assets/images/aboutImgs/monitoring.png"
import four from"../../../assets/images/aboutImgs/signuppic.png"
import DarkStyle from '../../DarkMode/darkBtn.module.css'
import { useEffect } from 'react'





function Work() {
  useEffect(()=>{
    // Dark Mode
    const isDarkMode = localStorage.getItem("isDarkMode")
    if(isDarkMode){
      document.querySelector("#AboutWork")?.classList.toggle(DarkStyle["AboutWork"], isDarkMode);
      document.querySelector("#AboutWorkCardOne")?.classList.toggle(DarkStyle["AboutWorkCardOne"], isDarkMode);
      document.querySelector("#AboutWorkCardTwo")?.classList.toggle(DarkStyle["AboutWorkCardOne"], isDarkMode);
      document.querySelector("#AboutWorkCardThree")?.classList.toggle(DarkStyle["AboutWorkCardOne"], isDarkMode);
    }
  },[])
  return (
    <>
    <body style={{paddingBottom: '70px'}} id='AboutWork' dir="rtl">
    <section className={`${workstyle.work_section} ${workstyle.padding_top}`}>
    <div className={"container"}>
      <div className={workstyle.heading_container}>
        <h2>كيف تحجز فى موقعنا</h2>
        <p style={{lineHeight:'25px'}} className='w-75 pb-3'>
        نسعى جاهدين لتسهيل تجربتك وتوفير وسائل سهلة ومريحة لحجز المواعيد الطبية. نحن ندرك أهمية الوقت والتنظيم في الحصول على الرعاية الصحية المناسبة، ولذلك نقدم لكم خطوات بسيطة لحجز موعد في موقعنا.
        </p>
      </div>
      <div className={"row"}>
        <div className={"col-md-6"}>
          <div className={workstyle.detail_container}>
            <div id='AboutWorkCardOne' className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={one} alt="" />
                </div>
                <h5>اولا يجب عليك التسجيل فى الموقع</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                نؤمن بأهمية بداية جيدة لتجربة صحية مميزة. ومن أجل الاستفادة الكاملة من موقعنا الطبي، يتعين عليك التسجيل في الموقع. التسجيل هو الخطوة الأولى للوصول إلى محتوى حصري والحصول على ميزات إضافية تسهل تجربتك في استكشاف خدماتنا وحجز المواعيد الطبية بكل يسر وسهولة
                </p>
                <div className={workstyle.btn_box}>
                  <a href="/" className={workstyle.btn_1}>
                    سجل هنا
                  </a>
                </div>
              </div>
            </div>
            <div id='AboutWorkCardTwo' className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={two} alt="" />
                </div>
                <h5>ويمكنك حجز خدمة التمريض</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                نحن نقدم لكم أيضًا خدمة حجز الممرضين في موقعنا. فهمنا أن بعض الحالات الطبية تتطلب رعاية مستمرة ومراقبة دقيقة، وهنا يأتي دور الممرضين الذين يقدمون الرعاية الأساسية والتمريضية.
                </p>
                <div className={workstyle.btn_box}>
                  <a href="/" className={workstyle.btn_1}>
                    احجز ممرض / ة
                  </a>
                </div>
              </div>
            </div>
            <div id='AboutWorkCardThree' className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={three} alt="" />
                </div>
                <h5>و يمكنك حجز أجهزة طبية او أدوات طبية من هنا</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                نسعى جاهدين لتلبية جميع احتياجاتك الطبية. بغض النظر عن الجهاز الطبي الذي تحتاجه، يمكنك الآن حجز أجهزة طبية مهمة في موقعنا. ندرك أهمية توفير الأجهزة اللازمة للرعاية الصحية المستمرة والعلاجات المنزلية، ولذلك نقدم لك خدمة حجز الأجهزة الطبية المتخصصة في موقعنا.
                </p>
                <div className={workstyle.btn_box}>
                  <a href="/" className={workstyle.btn_1}>
                    احجز جهاز
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${'col-md-5'} ${'align-self-center'}`}>
          <div className={workstyle.img_box}>
            <img src={four} alt="" />
          </div>
        </div>
      </div>
      {/* <div class="btn-box">
    <a href="">
      Read More
    </a>
  </div> */}
    </div>
  </section>
  </body>
  </>
  )
}

export default Work