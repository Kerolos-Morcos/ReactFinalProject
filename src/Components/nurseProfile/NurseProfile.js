import React, { useEffect, useState } from "react";
import nurseProfilee from "./NurseProfile.module.css";
import AddExperience from "./AddExperience";
import NurseResume from "./NurseResume";
import EditInfo from "./EditInfo";
import { useSelector, useDispatch } from "react-redux";
import { getNurse } from "../../Redux/Slices/NurseProfileR";
import NurseEduAdd from "./NurseEduAdd";
import AddEducation from "./AddEducation";
import Rating from "./Rates";
import WorkingTimes from './WorkingTimes'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import Fade from 'react-reveal/Fade'

// Modal Try
import { Modal, Button } from "react-bootstrap";
import Chat from "../ChatComponent/Chat";
import { NavLink } from "react-router-dom";

function NurseProfile({ Socket }) {

  // console.log("Socket....",Socket);
  const url = "http://localhost:3500/";
  const dispatch = useDispatch();
  const nurse = useSelector((state) => state.nurseProfileSlice);
  const userChat = JSON.parse(localStorage.getItem("user"));
  // console.log(nurse);
  // console.log(nurse["data"]["name"]);
  // console.log(nurse.nurse.age);
  let info = nurse.nurseProfile;
  let R = 0;
  // console.log( typeof info.rate);
  // console.log(R);
  if (!info.rates) {
    R = 0;
  } else {
    R = info.rates;
  }
  // console.log(`${url}${info.profile}`);
  // console.log(info);
  // console.log(info.education);
  useEffect(() => {
    dispatch(getNurse()); // fire action
    const isDarkMode = localStorage.getItem("isDarkMode")
    if(isDarkMode){
    document.querySelector("#MainProfileBackground")?.classList.toggle(DarkStyle["MainProfileBackground"], isDarkMode);
    document.querySelector("#MainProfile")?.classList.toggle(DarkStyle["MainProfile"], isDarkMode);
    document.querySelector("#NurseName")?.classList.toggle(DarkStyle["NurseName"], isDarkMode);
    document.querySelector("#NurseCounter")?.classList.toggle(DarkStyle["NurseCounter"], isDarkMode);
    document.querySelector("#NurseCounterFastService")?.classList.toggle(DarkStyle["NurseCounter"], isDarkMode);
    document.querySelector("#NurseCounterHomeShift")?.classList.toggle(DarkStyle["NurseCounter"], isDarkMode);
    }
    // console.log("object");
  }, []);

  // chat
  const username = JSON.parse(localStorage.getItem("user")).name;
  const NurseId = JSON.parse(localStorage.getItem("user"))._id;
  const room = 2;
  
  const joinRoom = () => {
    // if (username !== "" && room !== "") {
      // alert("join")
      // console.log(Socket);
      Socket?.emit("join_room", NurseId);
      // setShowChat(true);
    // }
  };

  const sendChatNotification = () =>{
    Socket?.emit("sendNotificationChat", {
      username:userChat.name,
      userId:nurse._id
     });

    //  Socket?.on("sendNotificationChat", (data) => {

    //   console.log(data);
    //  });
  }

  // Modal TRy
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="MainProfileBackground">
      <Fade top distance="10%" duration={1500}>
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
        <div id="MainProfile" className={`${nurseProfilee.main} ${nurseProfilee.main_raised}`}>
          <div className={"profile-content"}>
            <div className={"container"}>
              <div className={"row"}>
                <div className={"col-md-6 ms-auto me-auto "}>
                  <div className={nurseProfilee.profile}>
                    <div className={nurseProfilee.profIMG}>
                      <img
                        src={`${url}${info.profile}`}
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

                    <div id="NurseName" className={nurseProfilee.name}>
                      <h3 className={nurseProfilee.title}>{info.name}</h3>
                      <div className={`${nurseProfilee.r} ${" mt-4 "}`}>
                        <Rating rate={R} />
                      </div>

                      <Button
                        className={`${"btn mt-3"} ${
                          nurseProfilee["btn_outline_primary"]
                        }`}
                        onClick={() => {
                          joinRoom();
                          handleOpenModal();
                          sendChatNotification();
                        }}
                      >
                        الرسائل الواردة <i className="fa-solid fa-comment-dots "></i>
                      </Button>

                       {/* <NavLink to="/Chat"
                        className={`${"btn mt-3"} ${
                          nurseProfilee["btn_outline_primary"]
                        }`}
                        onClick={() => {joinRoom();  }}
                      >
                        الرسائل الواردة <i className="fa-solid fa-comment-dots "></i>
                      </NavLink> */}

                      {/* Modal */}
                      <Modal show={showModal}>
                        <Modal.Header
                          style={{
                            background: "#43a047",
                            color: "white",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <Modal.Title>مباشر الآن</Modal.Title>
                          <Modal.Title
                            type="button"
                            class="close"
                            style={{ cursor: "pointer", fontSize: "32px" }}
                            onClick={handleCloseModal}
                          >
                            {" "}
                            &times;{" "}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Chat Socket={Socket} username={username} room={NurseId}/>
                        </Modal.Body>
                      </Modal>
                      {/* <h6>اخصائية تمريض بمستشفي أسوان الجامعي</h6> */}
                      <h6>
                        {info.experience &&
                          info.experience.length > 0 &&
                          `${info.experience[0].title} في ${info.experience[0].company}`}
                      </h6>


                      <a
                        href="#pablo"
                        className={`${nurseProfilee.btn} ${nurseProfilee.btn_just_icon} ${nurseProfilee.btn_link}`}
                      >
                        <i class="fa-solid fa-building-columns fa-lg p-2"></i>
                        <AddEducation />
                      </a>
                      <a
                        href="#pablo"
                        className={`${nurseProfilee.btn} ${nurseProfilee.btn_just_icon} ${nurseProfilee.btn_link}`}
                      >
                        <i class="fa-solid fa-certificate fa-lg ps-2"></i>
                        <AddExperience />
                      </a>
                      <a
                        href="#pablo"
                        className={`${nurseProfilee.btn} ${nurseProfilee.btn_just_icon} ${nurseProfilee.btn_link}`}
                      >
                        <i class="fa-solid fa-clock fa-lg ps-2"></i>
                        <WorkingTimes />
                      </a>
                      <a
                        href="#pablo"
                        className={`${nurseProfilee.btn} ${nurseProfilee.btn_just_icon} ${nurseProfilee.btn_link}`}
                      >
                        <i class="fa-solid fa-pen-to-square fa-lg ps-2"></i>
                        {info != {} && <EditInfo data={info} />}
                      </a>
             
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${nurseProfilee.description} ${"text-center"}`}>
                {/* <p>
              An artist of considerable range, Chet Faker — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
              records all of his own music, giving it a warm, intimate feel with a
              solid groove structure.{" "}
            </p> */}
              </div>
            </div>

            <div className={nurseProfilee.parent}>
              <div className={nurseProfilee.row}>
                <div className={"col-md-3 col-sm-6 m-4"}>
                  <div id="NurseCounter" className={nurseProfilee.counter}>
                    <div className={nurseProfilee.counter_content}>
                      <div className={nurseProfilee.counter_icon}>
                        <i class="fa-solid fa-bed-pulse fa-2xl"></i>
                      </div>
                      <h3>مريض سعيد</h3>
                    </div>
                    <span className={nurseProfilee.counter_value}>
                      {/* {info.booking.length + info.booking.length} */}
                      10
                    </span>
                  </div>
                </div>

                <div className={"col-md-3 col-sm-6 m-4"}>
                  <div id="NurseCounterFastService" className={nurseProfilee.counter}>
                    <div className={nurseProfilee.counter_content}>
                      <div className={nurseProfilee.counter_icon}>
                        <i class="fa-solid fa-syringe fa-2xl"></i>
                      </div>
                      <h3>خدمة سريعة</h3>
                    </div>
                    <span className={nurseProfilee.counter_value}>
                      {/* {info.booking.length} */}
                      15
                    </span>
                  </div>
                </div>

                <div className={"col-md-3 col-sm-6 m-4 "}>
                  <div id="NurseCounterHomeShift" className={nurseProfilee.counter}>
                    <div className={nurseProfilee.counter_content}>
                      <div className={nurseProfilee.counter_icon}>
                        <i class="fa-solid fa-house-medical fa-2xl"></i>
                      </div>
                      <h3> شفت منزلي</h3>
                    </div>
                    <span className={nurseProfilee.counter_value}>
                      {/* {info.booking.length} */}
                      25
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <NurseResume />
          </div>
        </div>
      </section>
      </Fade>
    </div>
  );
}

export default NurseProfile;
