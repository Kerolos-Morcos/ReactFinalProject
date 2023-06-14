import React from 'react'
// import { getPatient } from '../Redux/Slices/PatientSlice';
import { getPatient } from '../../Redux/Slices/PatientSlice';
import { useDispatch, useSelector } from 'react-redux';
import  { useEffect } from 'react';
import ModalPost from '../Modal/Modal'
import EditInfo from "./EditInfo";

function PatientProfile() {
  const patientes  = useSelector(state => state.PatientSlice.patient)
  // console.log(patientes.patient);
  const dispatch = useDispatch();
  let info = patientes
    useEffect(() => {
      dispatch(getPatient());
      //  console.log(patientes.data)
    },[])
    // console.log(patientes);
  return (
    <div className='mt-4'>
    <section className='pt-5' style={{ backgroundColor: "#eee" }} dir='rtl'>
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
                <button type="button" className={"btn btn-success"}>
                {info!={}&& <EditInfo  data={info}/>}
                  
                  </button>
                {/* <p className="text-muted mb-1">مريض</p> */}
                {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                <div className="d-flex justify-content-center mb-2">
                  {/* <button type="button" className="btn btn-primary">
                    Follow
                  </button> */}
                  {/* <button type="button" className="btn btn-outline-primary ms-1 mt-3"> */}
                   
                  {/* </button> */}
                   <ModalPost/>
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
                  <li className={"list-group-item d-flex justify-content-between align-items-center p-3"}>
                    <i
                      className={"fab fa-twitter fa-lg"}
                      style={{ color: "#55acee" }}
                    />
                    <p className="mb-0">Twitter</p>
                  </li>
                  <li className={"list-group-item d-flex justify-content-between align-items-center p-3"}>
                    <i
                      className={"fab fa-instagram fa-lg"}
                      style={{ color: "#ac2bac" }}
                    />
                    <p className={"mb-0"}>Instagram</p>
                  </li>
                  <li className={"list-group-item d-flex justify-content-between align-items-center p-3"}>
                    <i
                      className={"fab fa-facebook-f fa-lg"}
                      style={{ color: "#3b5998" }}
                    />
                    <p className={"mb-0"}>Facebook</p>
                  </li>
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
                    <p className={"text-muted mb-0"}>{patientes.phoneNumber}</p>
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
                    <p className={"text-muted mb-0"}>{patientes.nationalId}</p>
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


            <div className={"row"}>
              <div className={"col-md-6"}>
                <div className={"card mb-4 mb-md-0"}>
                  <div className={"card-body"}>
                    <p className={"mb-4"}>
                      <span className={"text-primary font-italic me-1"}>
                       ddsddsdsd
                      </span>
                     
                    </p>
                    <p className={"mb-1"} style={{ fontSize: ".77rem" }}>
                    ghjgh
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                  hjkhjkhj
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow={72}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                    kljlkj
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow={89}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                    kljlkjlkj
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow={55}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                    kljlkjlkj
                    </p>
                    <div className={"progress rounded mb-2"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow={66}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={"col-md-6"}>
                <div className={"card mb-4 mb-md-0"}>
                  <div className={"card-body"}>
                    <p className={"mb-4"}>
                      <span className={"text-primary font-italic me-1"}>
                        {/* assigment */} hjgjhg
                      </span>
                      {/* Project Status */}
                    </p>
                    <p className={"mb-1"} style={{ fontSize: ".77rem" }}>
                      {/* Web Design */} bhjbjh
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                      {/* Website Markup */} hjkhjkh
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "72%" }}
                        // aria-valuenow={72}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                      {/* One Page */} jhgjh
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "89%" }}
                        // aria-valuenow={89}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                      {/* Mobile Template */} hjgh
                    </p>
                    <div className={"progress rounded"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role="progressbar"
                        style={{ width: "55%" }}
                        // aria-valuenow={55}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className={"mt-4 mb-1"} style={{ fontSize: ".77rem" }}>
                      {/* Backend API */} hjgjh
                    </p>
                    <div className={"progress rounded mb-2"} style={{ height: 5 }}>
                      <div
                        className={"progress-bar"}
                        role={"progressbar"}
                        style={{ width: "66%" }}
                        // aria-valuenow={66}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  )
}

export default PatientProfile