import React from 'react'
import styles from './card.module.css'
import { useDispatch } from 'react-redux'
// import { addToCart } from '../../Redux/Slices/DeviceSlice'
import Rating from './Rating';
import { addToCart } from '../../Redux/Slices/CartSlice'
import { NavLink} from "react-router-dom";
import { getDeviceById } from "../../Redux/Slices/DeviceSlice";
import Devicedetails from '../DeviceDetails/Devicedetails';
import Rotate from 'react-reveal/Rotate'


// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// End Toastify

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
      function Card({ data }) {
          const api = "http://localhost:3500/";
          const dispatch = useDispatch()
          const handleAddToCart = (productId) => {
              dispatch(addToCart(productId));
              notify();
            };
            return (
        <>
            {/* equipments */}
            <section className={`${["mt-2 mb-5"]} ${styles.all__devices}`}>
                <div className={`${["container-fluid px-4"]}`}>
                <ToastContainer className="mt-5" />
                    <Rotate right distance="10%" duration={1500} className={`${["d-flex flex-wrap mx-1 justify-content-xlg-between justify-content-around"]}`}>
                        {/* card */}
                        <div className={`${["mb-4"]} ${styles.image_flip}`}>
                            <div className={`${["flip-0"]} ${styles.mainflip}`}>
                                <div className={styles.frontside}>
                                    <div className={`${[styles.card]} `}>
                                        <div className={`${["m-0 text-center row align-items-between justify-content-center"]} ${styles.card_body}`}>
                                            <div className={`${[styles.devimg]} ${["mt-3 mb-3"]}`}>
                                                <img src={`${api}${data.image[0]}`} alt="card_image" />
                                            </div>
                                            <h3 className={styles.card_title}>{data.name}</h3>
                                            <div className={`${styles.rates} ${" mt-4 "}`}>
                                                <Rating rate={data.rate} />
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.backside}>
                                    <div className={styles.card}>
                                        <div className={"m-0 text-center row align-content-between justify-content-center"}>
                                                <h3 className={`${[styles.card_title]} ${["my-3 pe-4"]}`}>{data.name}</h3>

                                                <button className={`${styles.zrr}`} onClick={() => handleAddToCart(data._id)}>
                                                    <h6 className={"d-flex justify-content-center"}>
                                                        <i className={"fa-solid fa-plus"}></i>
                                                    </h6>
                                                    {/* <i className={"fa-solid fa-cart-shopping"}></i> */}
                                                </button>
                                            <p className={`${[styles.card_text]} ${["p-3"]} ${["m-0 mb-2"]}`}> 
                                                اطلب الآن ليصلك الجهاز في اسرع وقت ممكن حتي باب المنزل 
                                            </p>
                                            <div className={` ${["d-flex justify-content-between align-items-center"]}`}>
                                                <h6 className={"my-2"}>سعر الإيجار/اليوم</h6>
                                                <span>
                                                    {data.price}
                                                </span>
                                            </div>
                                            <div className={"mb-3 d-flex justify-content-between align-items-center"}>
                                                <h6 className={"my-2 mb-1"}>الكمية المتاحه</h6>
                                                <span className="span">{data.quantity}</span>
                                            </div>
                                            <div>
                                                <NavLink to={`/Devicedetails/${data._id}`} className={`${"btn-primary "} ${styles.zr}`} >
                                                    <h6>عرض المزيد</h6>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end card */}
                    </Rotate>
                </div>
            </section>
            {/* end equipments */}
        </>
    )
}

export default Card