import React, { useEffect } from "react";
import nurseProfilee from "./ShowNurseProfile.module.css";
import NurseResume from "./ShowNurseResume";
import { useSelector, useDispatch } from "react-redux";
// import { getNurse } from "../../Redux/Slices/NurseProfileR";
import ShowRating from "./ShowRates";
import ShowNurseResume from "./ShowNurseResume";
import { useParams } from 'react-router-dom';
import { getNurseById } from "../../Redux/Slices/PatientSlice";

function ShowNurseProfile({data}) {
  const {id}  = useParams();
  // console.log(id);
  const nurseprofileid=useSelector((state) => state.PatientSlice.device);
  console.log(nurseprofileid);

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

  return (
    <>
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
    </>
  );
}

export default ShowNurseProfile;
