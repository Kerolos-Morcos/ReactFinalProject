// import React from 'react'
// import check from './checkout.module.css'

// function Check() {
//   return (
//     <div className={check.body}>
//       <div className={"container"}>
//         <div className={check.card}>
//           <a href="./form.html">
//             <button className={check.proceed}>
//               <i class="fa-solid fa-arrow-left-long fa-fade fa-2xl"></i>         </button>
//           </a>
//           <img
//             src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
//             className={check.logo_card}
//             alt='visa'
//           />
//           <label>رقم الكارت:</label>
//           <input
//             id="user"
//             type="text"
//             className={`${check.input} ${check.cardnumber}`}
//             placeholder="1234 5678 9101 1121"
//           />
//           <input
//             id="user"
//             type="text"
//             className={`${check.input} ${check.cardnumber}`}
//             placeholder="اسم صاحب الكارت"
//           />
//           <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="mon" />
//           <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="year" />
//           <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="CCV" />
//         </div>
//         <div className={check.receipt}>
//           <div className={check.col}>
//             <p>التكلفة:</p>
//             <h2 className={check.cost}>ج.م400</h2>
//             <br />
//             <p>الاسم:</p>
//             <h2 className={check.seller}>هاني محمود  </h2>
//           </div>
//           <div className={check.col}>
//             <p> عناصر الطلب :</p>
//             <h3 className={check.bought_items}>أنبوبة اكسجين</h3>
//             <p className={`${check.bought_items} ${check.description}`}> يفتح تنقل الكراسي المتحركة فرصًا للمستخدمين للدراسة والعمل.
//             </p>
//             <p className={`${check.bought_items} ${check.price}`}>200 ج.م (50% عرض)</p>
//             <br />
//             <h3 className={check.bought_items}>كرسي متحرك </h3>
//             <p className={`${check.bought_items} ${check.description}`}>الكرسي المتحرك لكبار السن وذوي الاحتياجات الخاصة يصل وزنه الي 110 كيلو جرام
//             </p>
//             <p className={`${check.bought_items} ${check.price}`}>200 ج.م (50% عرض)</p>
//             <br />
//           </div>
//           <p className={check.comprobe}>هذه البيانات سوف نرسلها الي بريدك الالكتروني فور اتمام الطلب</p>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default Check

import React, { useEffect } from "react";
import checkStyle from "./checkout.module.css";
import { getPatient } from "../../Redux/Slices/PatientSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkOutOrder } from "../../Redux/Slices/OrderSlice";
import PaymentPage from "../PaymentPage/PaymentPage";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import DarkStyle from '../../Components/DarkMode/darkBtn.module.css'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'

function Check() {
  const navigate = useNavigate();
  const quantity = JSON.parse(localStorage.getItem("CartTotalQuantity"));
  const price = JSON.parse(localStorage.getItem("CartTotalPrice"));
  const api = "http://localhost:3500/";

  const patientes = useSelector((state) => state.PatientSlice.patient);
  // console.log(patientes.order[0]._id);
  const dispatch = useDispatch();
  // let info = patientes
  const MySwal = withReactContent(Swal)
  function CheckOut(id) {
    // console.log(id);
    MySwal.fire({
      title: `<p> تم اتمام الدفع بنجاح</p>`,
      icon: 'success',
      customClass: {
        confirmButton: `${checkStyle.my_ok_button_class}`,
      },
    });
    dispatch(checkOutOrder(id));
    
    setTimeout(() => {
      navigate('/patientProfile');
    }, 2000);

  }
  useEffect(() => {
    dispatch(getPatient());
      const isDarkMode = localStorage.getItem("isDarkMode");
      if (isDarkMode) {
        document.querySelector("#CheckOutPage")?.classList.toggle(DarkStyle["CheckOutPage"], isDarkMode);
        document.querySelector("#CheckoutElementsTitle")?.classList.toggle(DarkStyle["CheckoutElementsTitle"], isDarkMode);
        document.querySelector("#CheckOutInfo")?.classList.toggle(DarkStyle["CheckOutInfo"], isDarkMode);
      }
    //  console.log(patientes.data)
  }, []);

  return (
    // <div className={check.card}>

    //   <img
    //     src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
    //     className={check.logo_card}
    //     alt='visa'
    //   />
    //   <label>رقم الكارت:</label>
    //   <input
    //     id="user"
    //     type="text"
    //     className={`${check.input} ${check.cardnumber}`}
    //     placeholder="1234 5678 9101 1121"
    //   />
    //   <input
    //     id="user"
    //     type="text"
    //     className={`${check.input} ${check.cardnumber}`}
    //     placeholder="اسم صاحب الكارت"
    //   />
    //   <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="mon" />
    //   <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="year" />
    //   <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="CCV" />
    // </div>
    <motion.div id="CheckOutPage" className={checkStyle.body}
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
    >
      <div className={"container"}>
        <div
          className={`${"d-flex justify-content-between"} ${
            checkStyle.BiggestContainer
          }`}
        >
          <Slide left distance="10%" duration={1500}>
          <div className="mt-5 mb-5">
            <PaymentPage />
            <a className={checkStyle.KeepGoingAndPay}>
              <button
                onClick={() => CheckOut(patientes.order[0]._id)}
                className={checkStyle.proceed}
              >
                {" "} <i class="fa-solid fa-arrow-left-long fa-fade fa-xl"></i>{" "}
                مواصلة التقدم و تأكيد الدفع الآن 
              </button> 
          
             </a>
          </div>
          </Slide>

          <Fade top distance="10%" duration={1500}>
          <div className={checkStyle.receipt}>
            <div id="CheckOutInfo" className={checkStyle.columnItems}>
              <div>
                <p>الاسم :</p>
                <h2 className={checkStyle.seller}> {patientes.name} </h2>
              </div>
              <div>
                <p>التكلفة الكلية :</p>
                <h2 className={checkStyle.cost}>{price}ج.م</h2>
              </div>
              <div>
                <p> إجمالي عدد الأجهزة :</p>
                <h2 className={checkStyle.cost}>{quantity}</h2>
              </div>
            </div>

            <div id="CheckoutElementsTitle" className={checkStyle.columnProduct}>
              <p className={`${"pb-3"} ${checkStyle.columnProductTitle}`}> عناصر الطلب :</p>
              {patientes.order &&
                patientes.order.length > 0 &&
                patientes.order[patientes.order.length - 1].products.map(
                  (item) => {
                    return (
                      <div className={checkStyle.checkout}>
                        <div className={checkStyle.checkoutImg}>
                          <img src={`${api}${item.image[0]}`} />
                        </div>

                        {/* Description */}
                        <div className={checkStyle.ItemNameAndDesc}>
                          <h3 className={checkStyle.bought_items}>
                            {item.name}
                          </h3>
                          <p
                            className={`${checkStyle.bought_items} ${checkStyle.description}`}
                          >
                            {item.details}
                          </p>
                          {/* Description */}
                        </div>
                        {/* Item Quantity */}
                        <div className={checkStyle.ItemQuantity}>
                          <h3
                            className={`${checkStyle.bought_items} ${checkStyle.description}`}
                          >
                            العدد المطلوب :
                          </h3>
                          <p>{item.quantitycart} جهاز</p>
                        </div>
                        {/* Item Price */}
                        <div className={checkStyle.ItemPrice}>
                          <h3
                            className={`${checkStyle.bought_items} ${checkStyle.price}`}
                          >
                            {" "}
                            سعر الجهاز :
                          </h3>
                          <p>{item.price} ج.م</p>
                        </div>
                        {/* Item Total Price */}
                        <div className={checkStyle.ItemTotalPrice}>
                          <h3
                            className={`${checkStyle.bought_items} ${checkStyle.price}`}
                          >
                            السعرالكلي للطلب :
                          </h3>
                          <p>{item.totalPrice} ج.م</p>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          </Fade>

        </div>
      </div>
    </motion.div>
  );
}

export default Check;
