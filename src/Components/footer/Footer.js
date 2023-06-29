import React, { useContext } from 'react'
import FooterStyle from './footer.module.css'
import Logo from '../../assets/images/Navbar__Logo.png'
// import { themeContext } from '../ConfigContext/DarkMode'
import { NavLink, Link } from 'react-router-dom'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import { useEffect } from 'react'

function Footer() {
  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("body").classList.add(DarkStyle["dark-mode"]);
      document.querySelector("footer").classList.add(DarkStyle["dark-mode"]);
      document.querySelector("#social")?.classList.toggle(DarkStyle["social"], isDarkMode);
    }
  }, []);
  return (
    <>
  {/* Start Footer */}
  <footer className={`${"footer-section"} ${FooterStyle.Footer_section}`}>
    <div className={"container"}>
      <div className={`${"footer-cta pt-5 pb-4"} ${FooterStyle.footer_cta}`}>
        <div className={"row"}>
          <div className={"col-xl-4 col-lg-4 col-md-12"}>
            <div className={FooterStyle.single_cta}>
              <div className={`${FooterStyle.cta_text} ${FooterStyle.visit}`}>
                <h4>قُــم بــزيارتنــــــــــــا</h4>
                <span className={FooterStyle.find_text}>
                  1010 Avenue, sw 54321, chandigarh
                </span>
              </div>
              <i className={"fas fa fa-map-marker-alt"}/>
            </div>
          </div>
          <div className={"col-xl-3 col-lg-2 col-md-12"}>
            <div className={FooterStyle.single_cta}>
              <div className={`${FooterStyle.cta_text}`}>
                <h4>اتـصـل بـنــا</h4>
                <span>9876543210</span>
              </div>
              <i className={"fas fa fa-phone fa-flip-horizontal"}/>
            </div>
          </div>
          <div className={`${"col-xl-2 col-lg-3 col-md-12"} ${FooterStyle.Mail}`}>
            <div className={FooterStyle.single_cta}>
              <div className={`${FooterStyle.cta_text}`}>
                <h4>راســـــلـنـــــا</h4>
                <span>mail@info.com</span>
              </div>
              <i className={"far fa fa-envelope-open"}/>
            </div>
          </div>
        </div>
      </div>
      <div className={`${"pt-5 pb-5"} ${FooterStyle.footer_content}`}>
        <div className={`${"row"} ${FooterStyle.row}`}>
          <div className={"col-xl-4 col-lg-6"}>
            <div className={`${FooterStyle.footer_widget}`}>
              <div className={`${FooterStyle.footer_logo}`}>
                <NavLink to="/Home">
                  <img src={Logo} />
                </NavLink>
              </div>
              <div className={`${FooterStyle.footer_text}`}>
                <p>
                  يشرفنا تواجدك في موقعنا ، نحن متواجدون بصفة مستمرة للرد علي كل استفساراتك و طلباتك ، و نتشرف بخدمتك في اي وقت و بأي طريقة ممكنة ، و يمكنك التواصل معنا بطرق مختلفة
                </p>
              </div>
            </div>
          </div>
          <div className={`${"col-xl-2 col-lg-4 col-md-3 col-sm-12"} ${FooterStyle.res}`}>
            <div className={`${FooterStyle.footer_widget}`}>
              <div className={`${ FooterStyle.footer_widget_heading}`}>
                <h3>وصول سريع</h3>
              </div>
              <ul className={`${"ps-0"} ${FooterStyle.listed}`}>
                <li>
                  <NavLink to="/Home">الرئيسية</NavLink>
                </li>
                <li>
                  <NavLink to="/Nurses">التمريض</NavLink>
                </li>
                <li>
                  <NavLink to="/Devices">الأجهزة الطبية</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${"col-xl-2 col-lg-5 col-md-3 col-sm-12"} ${FooterStyle.res}`}>
            <div className={`${FooterStyle.footer_widget}`}>
              <div className={`${FooterStyle.footer_widget_heading}`}>
                <h3>معلومات الاتصال</h3>
              </div>
              <ul className={`${"ps-0"} ${FooterStyle.listed}`}>
                <li>
                  <NavLink to="/About">عـــنَّا</NavLink>
                </li>
                <li>
                  <NavLink to="/contactUs">تواصل معنا</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${"col-xl-3 col-lg-4 col-md-12 col-sm-12"} ${FooterStyle.res}`}>
            <div className={`${FooterStyle.footer_widget}`}>
              <div className={`${ FooterStyle.footer_widget_heading}`}>
                <h3>تابـعـنــــا</h3>
              </div>
              <div className={`${"w-100"} ${FooterStyle.subscribe} ${FooterStyle.footer_text}`}>
                <p className={"mb-3"}>
                  قم بمتابعة كل اخبارنا الجديدة ، للإشترك معنا يرجي ملء النموذج
                  أدناه
                </p>
              </div>
              <div className={`${ FooterStyle.subscribe_form}`}>
                <form action="#">
                  <input type="text" placeholder="البريد الإلكتروني" />
                  <button>
                    <i className={"fab fa-telegram-plane"}/>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className={`${ FooterStyle.footer_social_icon}`}>
            <button id='social' className={`${FooterStyle.social}`}>
              <span>تابعنا علي</span>
              <div className={`${FooterStyle.container}`}>
                <svg
                  height={35}
                  width={35}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                  className={"icon"}
                >
                  <path
                    fill="#1DA1F2"
                    d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1877f2"
                  width={35}
                  height={35}
                >
                  <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.988 4.368 10.94 10.086 11.854v-8.391h-2.682v-3.256h2.682v-2.501c0-2.656 1.584-4.121 3.995-4.121 1.158 0 2.157.087 2.44.125v2.768l-1.67.001c-1.315 0-1.571.625-1.571 1.536v2.014h3.141l-.41 3.256h-2.731v8.391C19.632 22.94 24 17.988 24 12z" />
                </svg>
                {/* ?xml version="1.0" ? */}
                <svg
                  id="Capa_1"
                  style={{ enableBackground: "new 0 0 150 150" }}
                  version="1.1"
                  viewBox="0 0 150 150"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={43}
                  height={35}
                >
                  <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                    .st0 {\n                      fill: #1A73E8;\n                    }\n\n                    .st1 {\n                      fill: #EA4335;\n                    }\n\n                    .st2 {\n                      fill: #4285F4;\n                    }\n\n                    .st3 {\n                      fill: #FBBC04;\n                    }\n\n                    .st4 {\n                      fill: #34A853;\n                    }\n\n                    .st5 {\n                      fill: #4CAF50;\n                    }\n\n                    .st6 {\n                      fill: #1E88E5;\n                    }\n\n                    .st7 {\n                      fill: #E53935;\n                    }\n\n                    .st8 {\n                      fill: #C62828;\n                    }\n\n                    .st9 {\n                      fill: #FBC02D;\n                    }\n\n                    .st10 {\n                      fill: #1565C0;\n                    }\n\n                    .st11 {\n                      fill: #2E7D32;\n                    }\n\n                    .st12 {\n                      fill: #F6B704;\n                    }\n\n                    .st13 {\n                      fill: #E54335;\n                    }\n\n                    .st14 {\n                      fill: #4280EF;\n                    }\n\n                    .st15 {\n                      fill: #34A353;\n                    }\n\n                    .st16 {\n                      clip-path: url(#SVGID_2_);\n                    }\n\n                    .st17 {\n                      fill: #188038;\n                    }\n\n                    .st18 {\n                      opacity: 0.2;\n                      fill: #FFFFFF;\n                      enable-background: new;\n                    }\n\n                    .st19 {\n                      opacity: 0.3;\n                      fill: #0D652D;\n                      enable-background: new;\n                    }\n\n                    .st20 {\n                      clip-path: url(#SVGID_4_);\n                    }\n\n                    .st21 {\n                      opacity: 0.3;\n                      fill: url(#_45_shadow_1_);\n                      enable-background: new;\n                    }\n\n                    .st22 {\n                      clip-path: url(#SVGID_6_);\n                    }\n\n                    .st23 {\n                      fill: #FA7B17;\n                    }\n\n                    .st24 {\n                      opacity: 0.3;\n                      fill: #174EA6;\n                      enable-background: new;\n                    }\n\n                    .st25 {\n                      opacity: 0.3;\n                      fill: #A50E0E;\n                      enable-background: new;\n                    }\n\n                    .st26 {\n                      opacity: 0.3;\n                      fill: #E37400;\n                      enable-background: new;\n                    }\n\n                    .st27 {\n                      fill: url(#Finish_mask_1_);\n                    }\n\n                    .st28 {\n                      fill: #FFFFFF;\n                    }\n\n                    .st29 {\n                      fill: #0C9D58;\n                    }\n\n                    .st30 {\n                      opacity: 0.2;\n                      fill: #004D40;\n                      enable-background: new;\n                    }\n\n                    .st31 {\n                      opacity: 0.2;\n                      fill: #3E2723;\n                      enable-background: new;\n                    }\n\n                    .st32 {\n                      fill: #FFC107;\n                    }\n\n                    .st33 {\n                      opacity: 0.2;\n                      fill: #1A237E;\n                      enable-background: new;\n                    }\n\n                    .st34 {\n                      opacity: 0.2;\n                    }\n\n                    .st35 {\n                      fill: #1A237E;\n                    }\n\n                    .st36 {\n                      fill: url(#SVGID_7_);\n                    }\n\n                    .st37 {\n                      fill: #FBBC05;\n                    }\n\n                    .st38 {\n                      clip-path: url(#SVGID_9_);\n                      fill: #E53935;\n                    }\n\n                    .st39 {\n                      clip-path: url(#SVGID_11_);\n                      fill: #FBC02D;\n                    }\n\n                    .st40 {\n                      clip-path: url(#SVGID_13_);\n                      fill: #E53935;\n                    }\n\n                    .st41 {\n                      clip-path: url(#SVGID_15_);\n                      fill: #FBC02D;\n                    }\n                  "
                    }}
                  />
                  <g>
                    <path
                      className={"st14"}
                      d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5   C115,101.8,120,90,120,76.1L120,76.1z"
                    />
                    <path
                      className={"st15"}
                      d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9   L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z"
                    />
                    <path
                      className={"st12"}
                      d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z"
                    />
                    <path
                      className={"st13"}
                      d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3   l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z"
                    />
                  </g>
                </svg>
              </div>
            </button>
            {/* Dark Mode */}

          {/* <button className="theme-container shadow-dark" onClick={toggleDarkMode}>
            <img id="theme-icon"
              src="https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
            alt="ERR" />
          </button> */}

            {/* End Dark Mode */}
          </div>
        </div>
      </div>
    </div>
    {/* Copyright */}
    <div className={`${FooterStyle.copyright_area}`}>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"text-center"}>
            <div className={`${FooterStyle.copyright_text}`}>
              <p>
                Copyright © 2023, All Rights Reserved <a href="#">Nursique</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Copyright */}
  </footer>
  {/* End Footer */}
</>

  )
}

export default Footer