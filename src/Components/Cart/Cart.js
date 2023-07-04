import React, { useState } from 'react';
import CartStyle from '../Cart/cart.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { getAllCartProduct,deleteFormCart,emptyFormCart,addToCart } from ''
import { getAllCartProduct, deleteFromCart, emptyFromCart, addQuantity, minusQuantity } from '../../Redux/Slices/CartSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {motion} from 'framer-motion'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import Slide from 'react-reveal/Slide'


function CartComponent() {

  const { cart } = useSelector(state => state.CartSlice);

    const quantity = cart.reduce((total, item) => total + item.quantitycart, 0);
    const price = cart.reduce((total, item) => total + item.totalPrice, 0);
   localStorage.setItem('CartTotalQuantity',JSON.stringify(quantity));
    localStorage.setItem('CartTotalPrice',JSON.stringify(price));

  const dispatch = useDispatch();
  const api = "http://localhost:3500/"

  useEffect(() => {
    dispatch(getAllCartProduct())
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#CartComp")?.classList.toggle(DarkStyle["CartComp"], isDarkMode);
      document.querySelector("#CartSummary")?.classList.toggle(DarkStyle["CartSummary"], isDarkMode);
    }
  }, []);

  // const handEmptyCart = () => {
  //   dispatch(emptyFromCart());
  // }
  const handleAddQ = (itemQ) => {
    // console.log(itemQ);
    dispatch(addQuantity(itemQ))
  }
  const handleMinusQ = (itemQ) => {
    // console.log(itemQ);
    dispatch(minusQuantity(itemQ)).then(()=>dispatch(getAllCartProduct()))

  }
  const MySwal = withReactContent(Swal)
  const handledeletefromCart = (product) => {
    // console.log(product);
    MySwal.fire({
      title: <p> هل تريد حذف {product.name} ؟ </p>,
      showCancelButton: true,
      confirmButtonText: 'حذف',
      cancelButtonText: 'تراجع',
      customClass: {
        confirmButton: `${CartStyle.my_confirm_button_class}`,
        cancelButton: `${CartStyle.my_cancel_button_class}`
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromCart(product._id)).then(() => {
          MySwal.fire({
            title: `<p class="my-custom-class">لقد تم حذف ${product.name} بنجاح</p>`,
            icon: 'success',
            customClass: {
              confirmButton: `${CartStyle.my_ok_button_class}`,
            },
          });
        });
      }
      
    });
  };

  const handleEmptyCart = () => {
    MySwal.fire({
      title: <h4>هل انت واثق من حذف كل منتجاتك بالسلة ؟</h4>,
      confirmButtonText: 'حذف الكل',
      cancelButtonText: 'تراجع',
      customClass: {
        confirmButton: `${CartStyle.my_confirm_button_class}`,
        cancelButton: `${CartStyle.my_cancel_button_class}`
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(emptyFromCart()).then(() => {
          MySwal.fire(
          {
            title: <p>تم حذف جميع منتجاتك من السلة</p>,
            icon: 'success',
            customClass: {
              confirmButton: `${CartStyle.my_ok_button_class}`,
            }
          }
          );
        });
      }
    });
  };



  return (
    <motion.div id='CartComp' className={`${'mb-5 pb-5'} ${CartStyle.CartPage}`}
    initial={ {opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={ {opacity: 0 }}
    variants={{duration: 0.2}}
    transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
    >
      <Slide bottom distance="10%" duration={1500}>
      <div className={CartStyle.card}>
        <div className={`${"row"} ${CartStyle.row}`}>
          <div className={`${"col-md-8"} ${CartStyle.cart}`}>
            <div className={CartStyle.title}>
              <div className={`${"row"} ${CartStyle.row}`}>
                <div className={`${"col"} ${CartStyle.col} ${CartStyle.Heading}`}>
                  <h4>
                    <b>محتويات السلة </b>
                  </h4>
                </div>
                <div className={`${"col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3"} ${CartStyle.col} ${CartStyle.delAll}`}>
                  <button onClick={() => handleEmptyCart()}>إزالة الكل </button>
                </div>
              </div>
            </div>

            {cart && cart.map((item) => {
              return (
                <div className={`${"row border-top border-bottom"} ${CartStyle.row}`}>
                  <div className={`${"row main align-items-center"} ${CartStyle.row} ${CartStyle.main}`}>
                    <div className={`${"col-2"} ${CartStyle['col-2']}`}>
                      <img className="img-fluid" src={`${api}${item.image[0]}`} alt={item.name} />
                    </div>
                    <div className={`${"col"} ${CartStyle.col}`}>
                      <div className={`${"row text-muted"} ${CartStyle.row}`}>{item.name}</div>
                      {/* <div className={`${"row"} ${CartStyle.row}`}>قياس درجة الحرارة</div> */}
                    </div>
                    <div className={`${"col"} ${CartStyle.col}`}>
                      <button onClick={() => handleMinusQ(item._id)} className={CartStyle.Minuses}>-</button>
                      <a className={`${"border"} ${CartStyle.border}`}>
                       {item.quantitycart}
                      </a>
                      <button  onClick={() => handleAddQ(item._id)} className={CartStyle.Pluses}>+</button>
                    </div>
                    <div className={`${"col d-flex justify-content-between"} ${CartStyle.col}`}>
                      {item.price}ج.م <span className={`${"close"} ${CartStyle.close}`}></span>
                      <div className={CartStyle.delIcon}>
                        <button onClick={() => handledeletefromCart(item)}> <i className='fa fa-trash'></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}



          </div>
          <div id='CartSummary' className={`${"col-md-4 summary"} ${CartStyle.summary}`}>
            <div>
              <h5>
                <b>ملخص السلة</b>
              </h5>
            </div>
            <hr />
            <div className={`${"row"} ${CartStyle.row}`}>
              <div className={`${"col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-3"} ${CartStyle.col}`} style={{ paddingLeft: 0 }}>
                عدد المنتجات
              </div>
              {cart.length > 0 && 
              <div className={`${"col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-2 text-left me-5"} ${CartStyle.col}`}>{quantity} منتج</div>
              }
              </div>
            <div className={`${"row"} ${CartStyle.row}`}>
              <div className={`${"col-xxl-6 col-xl-6 col-lg-6 col-md-3 col-sm-6 text-left"} ${CartStyle.col}`} style={{ paddingLeft: 0 }}>
                سعر التوصيل
              </div>
              <div className={`${"col text-left me-5"} ${CartStyle.col}`}>0 ج.م</div>
            </div>

            <div id='CartBorder'
              className={`${"row"} ${CartStyle.row}`}
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)", padding: "2vh 0" }}
            >
              <div className={`${"col-xxl-7 col-xl-8 col-lg-8 col-md-7 col-sm-7"} ${CartStyle.col}`}>الإجمـالــــــي </div>
              {cart.length > 0 && 
              <div className={`${"col text-right"} ${CartStyle.col}`}>{price}ج.م</div>
              }
              </div>
            <NavLink to="/AskDevicePage" className={`${"btn"} ${CartStyle.CartButn}`}>مواصلة التقدم و الدفع</NavLink>
          </div>
        </div>
      </div>
      </Slide>

    </motion.div>
  )
}

export default CartComponent