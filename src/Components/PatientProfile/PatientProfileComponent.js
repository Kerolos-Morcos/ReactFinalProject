import React, { useState } from "react";
// import { getPatient } from '../Redux/Slices/PatientSlice';
import { getPatient,getBookindNurse,getPatientNotifications, getOrderStatusById} from "../../Redux/Slices/PatientSlice";
import { addRateToNurse } from "../../Redux/Slices/NurseProfileR";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ModalPost from "../Modal/Modal";
import EditInfo from "./EditInfo";
import Fade from 'react-reveal/Fade'

// Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RadioGroupRating from "../../Pages/AddRating/AddRate";
import moment from "moment/moment";
import Tour from 'reactour';

const MySwal = withReactContent(Swal)

// const handleRating = (id) => {
//   // console.log(id);
//   const RatingModal = ({ id,onRatingSelected }) => { 
//     return <RadioGroupRating size="large" onRatingSelected={onRatingSelected} />;
//   };

//   // const 

//   MySwal.fire({
//     title: <p>ما تقييمك؟</p>,
//     html: <RatingModal id={id} onRatingSelected={(rating) => {
//       if (rating) {
//         dispatch(getBookindNurse(id,rating))
//         // console.log(id);
//         // console.log(`Rating selected: ${rating}`);
//         // Process the rating, e.g. send it to a server
//       }
//     }} />,
//   });
// };


function PatientProfile() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const tourSteps = [
    {
      selector: '.step1',
      content: 'مرحبا بك في ملفك الشخصي ، لنتابع معًا رحلتنا لمعرفة تفاصيل ملفك الشخصي',
    },
    {
      selector: '#step2',
      content: 'من هنا يمكنك تعديل ملفك الشخصي',
    },
    {
      selector: '#step3',
      content: 'اما من هنا يمكنك طلب خدمة من خلال اضافة منشور جديد و ستجده في صفحة الطلبات',
    },
    {
      selector: '#step4',
      content: 'عند طلبك لجهاز طبي ، يمكنك متابعة حالة الطلب أولاً بأول',
    },
    {
      selector: '#step5',
      content: 'هنا تجد كل الاشعارات التي اتتك من قبل',
    },
    {
      selector: '#step6',
      content: 'يمكنك تقييم الممرض بعد طلبه من صفحة التمريض او من ملفه الشخصي',
    },
    {
      selector: '#step7',
      content: 'لقد انتهت شروحنا التوضيحية الآن ، نتمني لك رحلة موفقة في موقعنا',
    },
  ];

  useEffect(() => {
    setTimeout(()=>{
      const hasVisitedBefore = localStorage?.getItem('hasVisitedBefore');
      if (!hasVisitedBefore) {
        setIsTourOpen(true);
         localStorage.setItem('hasVisitedBefore', 'true');
      }
    },1000)
  }, []);

  useEffect(() => {
    if (isTourOpen) {
      document.body.style.overflow = 'hidden';  
    } else {
      document.body.style.overflow = 'auto';  
    }
  }, [isTourOpen]);

  const handleTourClose = () => {
    setIsTourOpen(false);
  };
















  const [rateNum,setRateNum]=useState(0)
  const patientes = useSelector((state) => state.PatientSlice.patient);
  const nursesBooking = useSelector((state) => state.PatientSlice.booking);
  const patientNotifications = useSelector((state) => state.PatientSlice.notification);
  const patientStatus = useSelector((state) => state.PatientSlice.patientStatus);
  // console.log("nursesBooking....",nursesBooking);
  const patientOrders = useSelector((state) => state.PatientSlice.patient?.order);


  const dispatch = useDispatch();
  let info = patientes;
  useEffect(() => {
    dispatch(getPatient());
    dispatch(getBookindNurse())
    dispatch(getPatientNotifications())
   }, []);

  useEffect(() => {
    if (patientOrders) {
      patientOrders.forEach((order) => {
        dispatch(getOrderStatusById(order._id));
      });
    }
  }, [patientOrders, dispatch]);








  const api="http://localhost:3500/"
  // console.log(patientes);

  const RatingModal = ({ id,onRatingSelected }) => { 
    return <RadioGroupRating size="large" onRatingSelected={onRatingSelected} />;
  };

  const handleRating = (item) => {
    //  console.log(id);
      MySwal.fire({
        title: <p>ما تقييمك؟</p>,
        customClass: {
          confirmButton: 'my_ok_button_class',
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.style.display = 'none';
        },
        html: <RatingModal id={item._id} onRatingSelected={(rating) => {
          if (rating) {
            dispatch(addRateToNurse({ NurseProfileId: item._id, ratenumbering: rating })).then(()=>dispatch(getBookindNurse()))
            Swal.fire({
              position: 'top',
              icon: 'success',
              // title: ` تم تقييم ${item.name} ب نجوم بنجاح `,
              title: `تم تقييم ${item.name} ب ${rating} نجوم بنجاح`,
              showConfirmButton: false,
              timer: 2000
          })
          }
        }} />,
      });
    };

  ////////////////////////
  return (
    <div className="mt-4">
      <section className="pt-5" style={{ backgroundColor: "#eee" }} dir="rtl">
        <div className={"container py-5"}>
          <div className={"row"}>
            <Fade right distance="10%" duration={1500}>
            <div className={"col-lg-4"}>
 

<Tour
  steps={tourSteps}
  isOpen={isTourOpen}
  onRequestClose={handleTourClose}
  className="custom-tour"
  
/>
              <div className={"card mb-4"}>
                <div className={"card-body text-center"}>
                  <div style={{width: '150px', height: '150px', margin: '0 auto', marginBottom: '55px' }}>
                  <img
                    src={`http://localhost:3500/${patientes.profile}`}
                    alt="avatar"
                    className={"rounded-circle img-fluid"}
                    style={{ width: '100%', height: 'auto' ,borderRadius: '50%'}}
                  />
                  </div>
                  <h5 className={"my-3"}>{patientes.name}</h5>
                  {/* <p className="text-muted mb-1">مريض</p> */}
                  {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div className="d-flex justify-content-center  mb-2">
                  <button type="button" className={" btn ms-1 "} style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', padding: '13px' }}>
                    {info != {} && <EditInfo data={info} />}
                    
                  </button>
                    {/* <button type="button" className="btn btn-primary">
                    Follow
                  </button> */}
                    {/* <button type="button" className="btn btn-outline-primary ms-1 mt-3"> */}

                    {/* </button> */}
                    <ModalPost />
                  </div>
                </div>
              </div>
              <div className={"card mb-4 mb-lg-0"}>
                <div className={"card-body p-0 "}>
                  <ul className={"list-group list-group-flush rounded-3"}>
                    {/* <li className={"list-group-item d-flex justify-content-between align-items-center p-3"}>
                    <i className={"fas fa-globe fa-lg text-warning"} />
                    <p className={"mb-0"}>https://mdbootstrap.com</p>
                  </li> */}
                    {/* <li className={"list-group-item d-flex justify-content-between align-items-center p-3"}>
                    <i
                      className={"fab fa-github fa-lg"}
                      style={{ color: "#333333" }}
                    />
                    <p className={"mb-0"}>mdbootstrap</p>
                  </li> */}
                    <li id="step4"
                      className={
                        "list-group-item d-flex justify-content-between align-items-center p-3"
                      }
                    >
                      <p className={"mb-0"}>
                        {" "}
                        <i class="fa-solid fa-bag-shopping"></i> طلباتي {" "} ({patientes.order && patientes.order.length > 0 ? patientes.order.length : 0})
                      </p>
                    </li>
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            تتبَّع حالة الطلب
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse step2"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            <ul
                              className={
                                "list-group list-group-flush rounded-3"
                              }
                              style={{overflow: 'auto', height: '150px'}}
                            >
                              {patientes.order && patientes.order.map((item,index)=>{
                                return (
                              <li
                                className={
                                  "list-group-item d-flex justify-content-between align-items-center p-3"
                                }
                              >
                                <a
                                  className={"mb-0"}
                                  style={{ cursor: "pointer", color: "green" }}
                                >
                                  لقد قمت بطلب خدمة بتاريخ {moment(item.createdAt).format('DD-MM-YYYY')} حالتة {patientStatus[item._id]}
                                </a>
                              </li>
                                )
                              })}
                              
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Accordion */}
                  </ul>
                 
                  
                </div>
              </div>
              <div className={"card mt-4 mb-4 mb-lg-0"}>
                <div className={"card-body p-0"}>
                <ul className={"list-group list-group-flush rounded-3"}
                 
                >
                  <li id="step5"
                      className={
                        "list-group-item d-flex justify-content-between align-items-center p-3"
                      }
                    >
                      <p className={"mb-0"}>
                        {" "}
                        <i class="fa-solid fa-bell"></i> إشعاراتي {" "} ({patientNotifications && patientNotifications.length > 0 ? patientNotifications.length: 0})
                      </p>
                    </li>
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            تصفَّح آخر الإشعارات
                          </button>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            <ul
                              className={
                                "list-group list-group-flush rounded-3"
                              }
                              style={{overflow: 'auto', height: '150px'}}
                            >
                              {/* ///////////////// */}
                              {patientNotifications && patientNotifications.map((item,index)=>{
                                return (
                                <li
                                className={
                                  "list-group-item d-flex justify-content-between align-items-center p-3"
                                }
                              >
                                <a
                                  className={"mb-0"}
                                  style={{ cursor: "pointer", color: "green" }}
                                >
                                  قام {item.postNurseName} بإرسال طلب علي منشورك بعنوان {item.postTitle}
                                 </a>
                              </li>
                                )
                              })}
                              
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                 
                  
                </div>
              </div>
            </div>
            </Fade>
            <Fade left distance="10%" duration={1500}>
            <div className={"col-lg-8"}>
              <div className={"card mb-4"}>
                <div className={"card-body"}>
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>الاسم بالكامل</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>{patientes.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>البريد الالكترونى</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>{patientes.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>رقم الهاتف</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>
                        {patientes.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>السن</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>{patientes.age}</p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>العنوان</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}> {patientes.region} </p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>الرقم القومى</p>
                    </div>
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>
                        {patientes.nationalId}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className={"row"}>
                    <div className={"col-sm-3"}>
                      <p className={"mb-0"}>النوع</p>
                    </div>
                    <div  className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>{patientes.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className={"row"} >
                <div className={"col-md-12"}>
                  <div className={"card mb-4 mb-md-0"}>
                    <h1 id="step6"
                      style={{
                        color: "#041858",
                        fontSize: "20px",
                        margin: "12px auto",
                      }}
                    >
                      ما تقييمك للخدمة ؟
                    </h1>
                    {/* Card Example */}
                    <div className="container" style={{overflow: 'auto', display: 'flex' , scrollSnapType: 'x', gap: '30px', width:'780px'}}>
                    {nursesBooking && nursesBooking.map((item) => {
                          if (item.status === "accepted") {
                            return (
                              <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                                <img style={{borderRadius: '8px', height: '240px', width: '240px'}} src={`${api}${item.profile}`} />
                                {/* <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src={item.profile} /> */}
                                <h1 style={{color: '#041858', fontSize: '1.3rem', padding: '0px', margin: '8px auto'}}>
                                  {item.name}
                                </h1>
                                <button onClick={()=>handleRating(item)} className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                                  قيّمه الآن
                                </button>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                    {/* Card Example */}
                  
                  </div>
                </div>
              </div>
            </div>
            </Fade>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientProfile;