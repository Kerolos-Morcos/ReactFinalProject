import React, { useEffect, useState } from "react";
import nurseProfilee from "./ShowNurseProfile.module.css";
import NurseResume from "./ShowNurseResume";
import { useSelector, useDispatch } from "react-redux";
// import { getNurse } from "../../Redux/Slices/NurseProfileR";
import ShowRating from "./ShowRates";
import ShowNurseResume from "./ShowNurseResume";
import { useParams } from 'react-router-dom';
import { getNurseById } from "../../Redux/Slices/PatientSlice";
import { motion } from 'framer-motion'
// New For Chat
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Chat from "../ChatComponent/Chat";
// New For Chat

function ShowNurseProfile({ data, Socket }) {
  // console.log(data);
  // Chat
  const username = JSON.parse(localStorage.getItem("user")).name;
  const userChat = JSON.parse(localStorage.getItem("user"));
  const room = 2;

  const { id } = useParams();
  // console.log(id);
  // console.log(Socket);
  const nurseprofileid = useSelector((state) => state.PatientSlice.device);
  // console.log(nurseprofileid);

  const url = "http://localhost:3500/";
  const dispatch = useDispatch();

  //   let R =  0;
  // if (!nurseprofileid.rate) {
  //     R = 0

  // }
  // else{
  //   R = nurseprofileid.rate

  // }
  useEffect(() => {
    dispatch(getNurseById(id));
  }, []);


  // Chat


  const joinRoom = () => {
    // if (username !== "" && id !== "") {

    Socket?.emit("join_room", id);
    // setShowChat(true);
    // }
  };
  // const sendChatNotification = () =>{
  //   Socket?.emit("sendNotificationChat", {
  //     username:userChat.name,
  //     userId:id
  //    });

  //   //  Socket?.on("sendNotificationChat", (data) => {

  //   //   console.log(data);
  //   //  });
  // }


  // Modal TRy
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      variants={{ duration: 0.2 }}
      transition={{ yoyo: Infinity }}
      style={{ overflow: 'hidden' }}
    >
      {nurseprofileid && (
        <section
          style={{ direction: "rtl" }}
          className={`${nurseProfilee.profile_page} ${nurseProfilee.container}`}
        >
          <div
            className={`${nurseProfilee.page_header} ${nurseProfilee.header_filter}`}
            data-parallax="true"
            style={{
              background:
                'rgba(0,0,0,.5)url("https://pikwizard.com/pw/medium/04672da5e3057cd167bc931bd321ada9.webp") ',
              backgroundSize: "cover",
            }}
          ></div>
          <div className={`${nurseProfilee.main} ${nurseProfilee.main_raised}`}>
            <div className={"profile-content"}>
              <div className={"container"}>
                <div className={"row"}>
                  <div className={"col-md-6 ms-auto me-auto "}>
                    <div className={nurseProfilee.profile}>
                      <div className={nurseProfilee.profIMG}>
                        <img
                          src={`${url}${nurseprofileid.profile}`}
                          // src="https://www.heathsidevets.co.uk/wp-content/uploads/2020/03/heathside-vets-vet-in-southampton-team-staff-bianca-collings.jpg"
                          alt="Circle Image"
                          className={
                            nurseProfilee["img_raised rounded_circle  img_fluid"]
                          }
                          style={{
                            borderRadius: "50%",
                            width: "100%",
                            margin: "0 auto",
                          }}
                        />
                      </div>

                      <div className={nurseProfilee.name}>
                        <h3 className={nurseProfilee.title}>{nurseprofileid.name}</h3>
                        <div className={`${nurseProfilee.r} ${" mt-4 "}`}>
                          {/* <ShowRating rate={R} /> */}
                        </div>
                        <h6>
                          {nurseprofileid.experience &&
                            nurseprofileid.experience.length > 0 &&
                            `${nurseprofileid.experience[0].title} في ${nurseprofileid.experience[0].company}`}
                        </h6>
                        {/* New For Chat */}
                        {/* <NavLink to="/Chat" className="btn btn-success" onClick={() => {sendChatNotification(); joinRoom();}}>
                                تواصل الآن
                              </NavLink> */}
                        {/* New For Chat */}
                        {/* Modal Try */}

                        {/* Button to open the modal */}
                        {/* <Button className={`${"btn"} ${nurseProfilee['btn_outline_primary']}`} onClick={() => {joinRoom(); sendChatNotification(); handleOpenModal();  }}> */}
                        <Button className={`${"btn"} ${nurseProfilee['btn_outline_primary']}`} onClick={() => { joinRoom(); handleOpenModal(); }}>
                          تواصل  <i className="fa-solid fa-comment-dots "></i>
                        </Button>

                        {/* <NavLink to="Chat" className={`${"btn"} ${nurseProfilee['btn_outline_primary']}`} onClick={() => {joinRoom();  }}>
                            تواصل  <i className="fa-solid fa-comment-dots "></i> 
                          </NavLink> */}

                        <NavLink to={`/FormNurse/${nurseprofileid}`} className={`${"btn me-2"} ${nurseProfilee['btn_outline_secondary']}`}>
                          ارسل طلب <i className="fa-solid fa-hand fa-bounce"></i>
                        </NavLink>

                        {/* Modal */}
                        <Modal show={showModal}>
                          <Modal.Header style={{ background: '#43a047', color: 'white', flexDirection: 'row-reverse' }}>
                            <Modal.Title >مباشر الآن</Modal.Title>
                            <Modal.Title type="button" class="close" style={{ cursor: 'pointer', fontSize: '32px' }} onClick={handleCloseModal} > &times; </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Chat Socket={Socket} username={username} room={id} />
                          </Modal.Body>
                        </Modal>



                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${nurseProfilee.description} ${"text-center"}`}>
                </div>
              </div>

              <div className={nurseProfilee.parent}>
                <div className={nurseProfilee.row}>
                  <div className={"col-md-3 col-sm-6 m-4"}>
                    <div className={nurseProfilee.counter}>
                      <div className={nurseProfilee.counter_content}>
                        <div className={nurseProfilee.counter_icon}>
                          <i class="fa-solid fa-bed-pulse fa-2xl"></i>
                        </div>
                        <h3>مريض سعيد</h3>
                      </div>
                      <span className={nurseProfilee.counter_value}>
                        {/* {nurseprofileid.booking.length + nurseprofileid.booking.length} */}

                      </span>
                    </div>
                  </div>

                  <div className={"col-md-3 col-sm-6 m-4"}>
                    <div className={nurseProfilee.counter}>
                      <div className={nurseProfilee.counter_content}>
                        <div className={nurseProfilee.counter_icon}>
                          <i class="fa-solid fa-syringe fa-2xl"></i>
                        </div>
                        <h3>خدمة سريعة</h3>
                      </div>
                      <span className={nurseProfilee.counter_value}>
                        {/* {nurseprofileid.booking.length} */}
                      </span>
                    </div>
                  </div>

                  <div className={"col-md-3 col-sm-6 m-4 "}>
                    <div className={nurseProfilee.counter}>
                      <div className={nurseProfilee.counter_content}>
                        <div className={nurseProfilee.counter_icon}>
                          <i class="fa-solid fa-house-medical fa-2xl"></i>
                        </div>
                        <h3> شفت منزلي</h3>
                      </div>
                      <span className={nurseProfilee.counter_value}>
                        {/* {nurseprofileid.booking.length} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <ShowNurseResume />
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default ShowNurseProfile;
