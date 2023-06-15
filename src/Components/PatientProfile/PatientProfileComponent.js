import React from "react";
// import { getPatient } from '../Redux/Slices/PatientSlice';
import { getPatient } from "../../Redux/Slices/PatientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ModalPost from "../Modal/Modal";
import EditInfo from "./EditInfo";

// Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RadioGroupRating from "../../Pages/AddRating/AddRate";

const MySwal = withReactContent(Swal)

const handleRating = () => {
  const RatingModal = () => {

    return <RadioGroupRating  size="large"/>;
  };

  MySwal.fire({
    title: <p>ما تقييمك؟</p>,
    html: <RatingModal />,
  }).then((result) => {
    // Handle the rating result
    if (result.isConfirmed) {
      // Rating submitted
      const rating = result.value;
      // Process the rating
    } else {
      // Rating canceled
    }
  });
};



function PatientProfile() {
  const patientes = useSelector((state) => state.PatientSlice.patient);
  // console.log(patientes.patient);
  const dispatch = useDispatch();
  let info = patientes;
  useEffect(() => {
    dispatch(getPatient());
    //  console.log(patientes.data)
  }, []);
  // console.log(patientes);
  return (
    <div className="mt-4">
      <section className="pt-5" style={{ backgroundColor: "#eee" }} dir="rtl">
        <div className={"container py-5"}>
          <div className={"row"}>
            <div className={"col-lg-4"}>
              <div className={"card mb-4"}>
                <div className={"card-body text-center"}>
                  <img
                    src={`http://localhost:3500/${patientes.profile}`}
                    alt="avatar"
                    className={"rounded-circle img-fluid"}
                    style={{ width: 150 }}
                  />
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
                <div className={"card-body p-0"}>
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
                    <li
                      className={
                        "list-group-item d-flex justify-content-between align-items-center p-3"
                      }
                    >
                      <p className={"mb-0"}>
                        {" "}
                        <i className="fa fa-bell"></i> الاشعارات{" "}
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
                            تصفح إشعاراتك الجديدة
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            <ul
                              className={
                                "list-group list-group-flush rounded-3"
                              }
                            >
                              <li
                                className={
                                  "list-group-item d-flex justify-content-between align-items-center p-3"
                                }
                              >
                                <a
                                  className={"mb-0"}
                                  style={{ cursor: "pointer", color: "green" }}
                                >
                                  قام هاني محمود بالرد علي استفسارك بخصوص تركيب
                                  محلول{" "}
                                  <i className="fa fa-arrow-left mt-2"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
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
                    <div className={"col-sm-9"}>
                      <p className={"text-muted mb-0"}>{patientes.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className={"row"}>
                <div className={"col-md-12"}>
                  <div className={"card mb-4 mb-md-0"}>
                    <h1
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
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', padding: '0px', margin: '8px auto'}}>
                          اسم الممرض
                        </h1>
                        <button onClick={handleRating} className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                          قيّمه الآن
                        </button>
                      </div>
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', margin: '8px auto', padding: '0px'}}>
                          اسم الممرض
                        </h1>
                        <button className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                        قيّمه الآن
                        </button>
                      </div>
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', margin: '8px auto', padding: '0px'}}>
                          اسم الممرض
                        </h1>
                        <button className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                        قيّمه الآن
                        </button>
                      </div>
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', margin: '8px auto', padding: '0px'}}>
                          اسم الممرض
                        </h1>
                        <button className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                        قيّمه الآن
                        </button>
                      </div>
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', margin: '8px auto', padding: '0px'}}>
                          اسم الممرض
                        </h1>
                        <button className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                        قيّمه الآن
                        </button>
                      </div>
                      <div className="item" style={{flexShrink: '0', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection: 'column', gap: '16px', border:'1px solid #e9e9e9', borderRadius: '8px', boxShadow:'0 3px 16px 2px rgba(0, 0, 0, .1)', padding: '24px', position: 'relative', top: '0px', width: '300px'}}>
                        <img style={{borderRadius: '8px', height: '250px', width: '250px'}} src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" />
                        <h1 style={{color: '#041858', fontSize: '1.3rem', margin: '8px auto',  padding: '0px'}}>
                          اسم الممرض
                        </h1>
                        <button className="p-2 ps-3 pe-3 mb-3" style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid', borderRadius: '8px' }}>
                        قيّمه الآن
                        </button>
                      </div>
                    </div>
                    {/* Card Example */}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientProfile;
