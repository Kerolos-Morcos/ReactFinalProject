import React, { useEffect } from "react";
import nurseProfilee from "./NurseProfile.module.css";
import AddExperience from "./AddExperience";
import NurseResume from "./NurseResume";
import EditInfo from "./EditInfo";
import { useSelector, useDispatch } from "react-redux";
import { getNurse } from "../../Redux/Slices/NurseProfileR";
import NurseEduAdd from "./NurseEduAdd";
import AddEducation from "./AddEducation";
import Rating from "./Rates";

function NurseProfile() {
  const url = "http://localhost:3500/";
  const dispatch = useDispatch();
  const nurse = useSelector((state) => state.nurseProfileSlice);
  console.log(nurse);
  // console.log(nurse["data"]["name"]);
  // console.log(nurse.nurse.age);
  let info = nurse.nurseProfile;
  let R =  0;
  // console.log( typeof info.rate);
  // console.log(R);
if (!info.rate) {
    R = 0
  
}
else{
  R = info.rate

}
  console.log(`${url}${info.profile}`);
  console.log(info);
  console.log(info.education);
  useEffect(() => {
    dispatch(getNurse()); // fire action

    console.log("object");
  }, []);

 
  return (
    <>
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

                    <div className={nurseProfilee.name}>
                      <h3 className={nurseProfilee.title}>{info.name}</h3>
                      <div className={`${nurseProfilee.r} ${" mt-4 "}`}>
                        <Rating rate={R} />
                      </div>
                     

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
                        <i class="fa-solid fa-pen-to-square fa-lg ps-2"></i>
                        {info != {} && <EditInfo data={info} />}
                      </a>
                      <a
                        href="#pablo"
                        className={`${nurseProfilee.btn} ${nurseProfilee.btn_just_icon} ${nurseProfilee.btn_link}`}
                      >
                        {/* <i className="fa fa-pinterest" /> */}
                        <i class="fa-solid fa-sack-dollar fa-lg ps-2"></i>
                        الرصيد
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
                  <div className={nurseProfilee.counter}>
                    <div className={nurseProfilee.counter_content}>
                      <div className={nurseProfilee.counter_icon}>
                        <i class="fa-solid fa-bed-pulse fa-2xl"></i>
                      </div>
                      <h3>مريض سعيد</h3>
                    </div>
                    <span className={nurseProfilee.counter_value}>
                    {/* {info.booking.length + info.booking.length} */}

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
                      {/* {info.booking.length} */}
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
                      {/* {info.booking.length} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <NurseResume />
          </div>
        </div>
      </section>
    </>
  );
}

export default NurseProfile;
