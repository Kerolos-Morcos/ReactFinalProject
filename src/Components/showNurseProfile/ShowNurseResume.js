import React, { useEffect } from "react";
import nurseProfile from "./ShowNurseResume.module.css";
// import EditEducation from "./EditEducation";
// import EditExperience from "./EditExperience";
import { getNurse } from "../../Redux/Slices/NurseProfileR";
import {useSelector,useDispatch} from 'react-redux'
// import {deleteNurseExperience, deleteNurseEducation} from "../../Redux/Slices/NurseProfileR";
import { useParams } from 'react-router-dom';
import { getNurseById } from "../../Redux/Slices/PatientSlice";

function ShowNurseResume() {
 
  const dispatch = useDispatch();
  const nurseprofileid=useSelector((state) => state.PatientSlice.device);
  console.log(nurseprofileid);
  const {id}  = useParams();

  useEffect(() => {
    dispatch(getNurseById(id));
  }, []);

  return (
    <>
    {nurseprofileid && (
    <div style={{ direction: "rtl" }}>
      <section
        id="about"
        className={`${nurseProfile.about} ${nurseProfile.container} ${nurseProfile.uppersec}`}
      >
        <div>
          <div className={nurseProfile.section_title}>
            <h4>نبذة  </h4>
            <p>
            {nurseprofileid.about}
            </p>
            <h4>المهارات</h4>
            <p>
            {nurseprofileid.skills}
            </p>
          </div>
          <div className={`${nurseProfile.row} row justify-content-between`}>
            <div className={"col-lg-6"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong> سعر الشفت :</strong> <span> {nurseprofileid.shiftPrice} ج.م</span>
                </li>

                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong>   العنوان : </strong> <span> {`${nurseprofileid.address} ${nurseprofileid.region}`}</span>
                </li>
              </ul>
            </div>
            <div className={"col-lg-6"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}

                </li>
              
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong>الحالة:</strong> <span>متوفر</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        className={`${nurseProfile.resume} ${nurseProfile.container}`}
      >
        <div className={"container"}>
          <div className={nurseProfile.row}>
            <div  className={`${"col-lg-6"}${nurseProfile.section_title}${nurseProfile.resume} `}
              data-aos="fade-up" >
  
    
  <h3 className={nurseProfile.resume_title}>التعليم</h3> 
  {nurseprofileid.education?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}> 
      <h4>   
        {element.degree} 
      </h4>
      <h5>{element.toDate}</h5>
      <p><em>{element.school}</em></p> 
      <p>{element.description}</p>
    </div>
  </div>

))}

<h3 className={nurseProfile.resume_title}>الخبرات</h3>
{nurseprofileid.experience?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}>
      <h4>
        {element.company}
      </h4>
      <h5>{element.fromDate} - {element.toDate}</h5>
      <p>
        <em>{element.title}</em>
        <em>{element.employmentType}</em>
      </p>
      <ul className={nurseProfile.ul}>
        <li>{element.description}</li>
      </ul>
    </div>
  </div>
))}


          </div>
          </div>
        </div>
      </section>
    </div>
    )}
    </>
  );
}

export default ShowNurseResume;
