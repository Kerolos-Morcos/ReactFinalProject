import React, { useEffect, useState } from "react";
import axios from "axios";
import TopStyle from "./topRated.module.css";
// import nurseOne from '../../../assets/imgs/nurse_one.png'
// import nurseTwo from '../../../assets/imgs/nurse_two.png'
// import nurseThree from '../../../assets/imgs/nurse_three.png'
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import Rating from "../../nurseProfile/Rates";
import DarkStyle from '../../DarkMode/darkBtn.module.css'
import { NavLink,useNavigate } from "react-router-dom";

// END SWIPER

const api = "http://localhost:3500/";
function TopRated() {
  let [topRated, getTopRated] = useState([]);
  console.log(topRated);
  useEffect(() => {
    axios
      .get("http://localhost:3500/nurse/top-rated")
      .then((res) => {
        getTopRated(res.data.data);
        console.log(topRated);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#TopRated")?.classList.toggle(DarkStyle["TopRated"], isDarkMode);
    }
  }, []);

  const nav = useNavigate()
  function goTo(user) {
    nav(`/FormNurse/${user._id}`, { state: user })
    console.log("user....",user);
  }

  return (
    <div id="TopRated">
      <div className={"col-sm-12 text-center"}>
        <div className={`${TopStyle.section_title_one}`}>
          <h1>أبرز مقدمي الخدمة</h1>
        </div>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        // centeredSlides={true}
        spaceBetween={100}
        slidesPerView={3}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        navigation
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectCoverflow,
          Autoplay,
        ]}
        // scrollbar={{ draggable: true }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: true,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // pagination={{ clickable: true }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            if (index < 7) {
              // limit the number of bullets to a dynamic number
              return '<span class="' + className + '"></span>';
            } else {
              return "";
            }
          },
        }}
        className={`${"mySwiper"} ${TopStyle.mySwiper} `}
      >
        {/* Start Top Rated */}

        <section
          className={`${"doctors-wrapper "} ${TopStyle.section_padding}`}
        >
          <div className={"container"}>
            <div className={"row text-center"}>
              {topRated.map((user) => (
                <SwiperSlide className={`${"col-md-6 col-lg-4 col-12"}`}>
                  <div className={`${TopStyle.single_doctor}`}>
                    <div className={`${TopStyle.doctor_profile}`}>
                      <img src={` ${api}${user.profile}`} />
                      {/* <img src={` ${user.profile}`} /> */}
                    </div>
                    <div className={`${TopStyle.doctor_info}`}>
                      <h3>
                        <a href="#">{user.name}</a>
                      </h3>

                      <span>
                        <span className={TopStyle.region}> {user.region} </span>
                        <Rating rate={user.rates} />
                      </span>
                    </div>
                    <div className={`${TopStyle.doctor_social_icons}`}>
                      <a onClick={()=> goTo(user)}>
                        <i className={"fa fa-user-nurse fa-bounce"}></i> بادر
                        بالحجز
                      </a>
                      {/* <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* <div className="col-md-6 col-lg-4 col-12">
          <div className="single-doctor">
            <div className="doctor-profile">
              <img src={nurseTwo} />
            </div>
            <div className="doctor-info">
              <h3>
                <a href="#">Salman Ahmed</a>
              </h3>
              <span>Oral Surgeon</span>
            </div>
            <div className="doctor-social-icons">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
              <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="#">
                <i className="fab fa-skype" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-12">
          <div className="single-doctor">
            <div className="doctor-profile">
              <img src={nurseThree} />
            </div>
            <div className="doctor-info">
              <h3>
                <a href="#">Santa Binte</a>
              </h3>
              <span>Oral Surgeon</span>
            </div>
            <div className="doctor-social-icons">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="#">
              <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div> */}
              {/* <div className="col-12 text-center mt-45">
          <a className="btn-link doctor-btn-link" href="#">
            <i className="fa fa-arrow-left" /> عـــرض الـكُــــل
          </a>
        </div> */}
            </div>
          </div>
        </section>
        {/* End Top Rated */}
      </Swiper>
    </div>
  );
}

export default TopRated;
