import React from 'react'
import workstyle from '../Work/workstyle.module.css' 
import one from "../../../assets/images/aboutImgs/edit.png"
import two from "../../../assets/images/aboutImgs/medical-team.png"
import three from"../../../assets/images/aboutImgs/monitoring.png"
import four from"../../../assets/images/aboutImgs/signuppic.png"





function Work() {
  return (
    <>
    <body dir="rtl">
    <section className={`${workstyle.work_section} ${workstyle.padding_top}`}>
    <div className={"container"}>
      <div className={workstyle.heading_container}>
        <h2>كيف تحجز فى موقعنا</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          voluptatem odit cum ut fugiat! Quae nisi voluptates quia libero, neque
          commodi perspiciatis placeat ipsum natus quidem. Eveniet ipsam cum
          vitae?{" "}
        </p>
      </div>
      <div className={"row"}>
        <div className={"col-md-6"}>
          <div className={workstyle.detail_container}>
            <div className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={one} alt="" />
                </div>
                <h5>اولا يجب عليك التسجيل فى الموقع</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam
                </p>
                <div className={workstyle.btn_box}>
                  <a href="/" className={workstyle.btn_1}>
                    سجل هنا
                  </a>
                </div>
              </div>
            </div>
            <div className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={two} alt="" />
                </div>
                <h5>ويمكنك حجز خدمة التمريض</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam
                </p>
                <div className={workstyle.btn_box}>
                  <a href="/" className={workstyle.btn_1}>
                    احجز ممرض / ة
                  </a>
                </div>
              </div>
            </div>
            <div className={`${workstyle.box} ${workstyle.b_1}`}>
              <div className={workstyle.top_box}>
                <div className={workstyle.icon_box}>
                  <img src={three} alt="" />
                </div>
                <h5>و يمكنك حجز أجهزة طبية او أدوات طبية من هنا</h5>
              </div>
              <div className={workstyle.bottom_box}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam
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