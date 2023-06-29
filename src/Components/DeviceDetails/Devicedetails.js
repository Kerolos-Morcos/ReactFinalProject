import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeviceById } from "../../Redux/Slices/DeviceSlice";
import { useParams } from 'react-router-dom';
import CardDetails from './Devicedetails.module.css'
import { addToCart } from '../../Redux/Slices/CartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from 'framer-motion'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'

const notify = () =>
    toast.success('! تمت اضافة المنتج الي السلة', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom_toast",
        style: { textAlign: "center" },
      });


function Devicedetails({ data }) {
  console.log(data);
  const { id } = useParams();
  // console.log(id);
  const deviceDetails = useSelector((state) => state.DeviceSlice.device);
  console.log(deviceDetails);
  const dispatch = useDispatch();
  const api = "http://localhost:3500/";

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
    notify();
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getDeviceById(id));
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#DeviceDetails")?.classList.toggle(DarkStyle["DeviceDetails"], isDarkMode);
      document.querySelector("#productPrice")?.classList.toggle(DarkStyle["productPrice"], isDarkMode);
      document.querySelector("#DeviceDetailing")?.classList.toggle(DarkStyle["DeviceDetailing"], isDarkMode);
    }
  }, []);
  

  return (
    <motion.div
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
    >
        <ToastContainer className="mt-5"></ToastContainer>
      {deviceDetails && deviceDetails.image && deviceDetails.image[0] && (
        <main id='DeviceDetails' className={"mt-5 pt-4"} style={{direction:'rtl'}}>
          <div className={"container mt-5"}>
            <div className={"row"}>
              <Slide right distance="10%" duration={1500}>
              <div className={`${"col-md-6 mb-4"} ${CardDetails.MainImg}`}>
                <img
                  src={`${api}${deviceDetails.image[0]}`}
                  className={"img-fluid"}
                  alt=""
                  />
              </div>
                  </Slide>

              <Slide left distance="10%" duration={1500}>
              <div className={"col-md-6 mb-4"}>
                <div className={`${CardDetails.DetailsData}`}>
                  <div className={"mb-3"}>
                    <a >
                      <span className={`${"badge bg-dark me-1"} ${CardDetails.badge}`}>
                        {deviceDetails.category}
                      </span>
                    </a>
                    <a href="/">
                      <span className={`${"badge bg-info me-1"} ${CardDetails.badgeNew}`}>جديد</span>
                    </a>
                    <a href="/">
                      <span className={`${"badge bg-danger me-1"} ${CardDetails.badgeBest}`}>أفضل سعر</span>
                    </a>
                  </div>
                  <h1 className={"mb-3 mt-3"}>{deviceDetails.name}</h1>
                  <p id='productPrice' className={`${"lead"} ${CardDetails.prdPrice}`}>
                    <span> سعر الجهاز :  {deviceDetails.price}$</span>
                  </p>
                  <div className={`${CardDetails.DescriptionTitle}`}>
                    <p className='pb-3'>التفاصيل</p>
                  </div>
                  <p id='DeviceDetailing'>{deviceDetails.details}</p>
                  {/* <form className={"d-flex justify-content-left"}> */}
                    <button className={`${"btn btn-primary ms-1"} ${CardDetails.AddToCartBTN} `}  onClick={() => handleAddToCart(deviceDetails._id)} >
                      إضافة للعربة
                      <i className={"fas fa-shopping-cart me-2 ms-1"} />
                    </button>
                  {/* </form> */}
                </div>
              </div>
              </Slide>
            </div>
            <hr />

            <Fade top distance="10%" duration={1500}>
            <div className={"row  justify-content-center"}>
              <div className={`${"col-md-12 text-center"} ${CardDetails.AdditionalDetails}`}>
                <h4 className={"my-4 h4"}>صور اضافية للمنتج</h4>
                {/* <p>{deviceDetails.details}</p> */}
              </div>
            </div>
            </Fade>

            <Flip top distance="10%" duration={1500}>
            <div className={`${"row justify-content-between align-items-center"} ${CardDetails.DetailsIMG}`}>
              <div className={`${"col-lg-4 col-md-12 mb-4"}`}>
                {deviceDetails.image[1] && (
                  <img
                    src={`${api}${deviceDetails.image[1]}`}
                    className={"img-fluid"}
                    alt=""
                    />
                    )}
              </div>
              <div className={"col-lg-4 col-md-6 mb-4"}>
                {deviceDetails.image[2] && (
                  <img
                    src={`${api}${deviceDetails.image[2]}`}
                    className={"img-fluid"}
                    alt=""
                  />
                )}
              </div>
              <div className={"col-lg-4 col-md-6 mb-4"}>
                {deviceDetails.image[3] && (
                  <img
                    src={`${api}${deviceDetails.image[3]}`}
                    className={"img-fluid"}
                    alt=""
                  />
                )}
              </div>
            </div>
            </Flip>
          </div>
        </main>
      )}
    </motion.div>
  );
}

export default Devicedetails;