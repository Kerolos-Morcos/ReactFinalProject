import React, { useEffect } from "react";
import nurseProfile from "./ShowNurseResume.module.css";
// import EditEducation from "./EditEducation";
// import EditExperience from "./EditExperience";
import { getNurse } from "../../Redux/Slices/NurseProfileR";
import {useSelector,useDispatch} from 'react-redux'
// import {deleteNurseExperience, deleteNurseEducation} from "../../Redux/Slices/NurseProfileR";
import { useParams } from 'react-router-dom';
import { getNurseById } from "../../Redux/Slices/PatientSlice";
import DarkStyle from '../DarkMode/darkBtn.module.css'
import moment from "moment";
import Fade from 'react-reveal/Fade'

function ShowNurseResume() {
 
  const dispatch = useDispatch();
  const nurseprofileid=useSelector((state) => state.PatientSlice.device);
  // console.log(nurseprofileid);
  const {id}  = useParams();

  useEffect(() => {
    dispatch(getNurseById(id));
    const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    if(isDarkMode){
      document.querySelector("#ShowNurseResumeHeadings")?.classList.toggle(DarkStyle["NurseResumeHeadings"], isDarkMode);
      document.querySelector("#resume")?.classList.toggle(DarkStyle["resume"], isDarkMode);
    }
  }, []);

  return (
    <>
    {nurseprofileid && (
      <div style={{ direction: "rtl" }}>
        <Fade bottom distance="10%" duration={1500}>
      <section
        id="about"
        className={`${nurseProfile.about} ${nurseProfile.container} ${nurseProfile.uppersec}`}
      >
        <div id="ShowNurseResumeHeadings">
          <div className={`${nurseProfile.section_title} ${'d-flex justify-content-evenly text-center mt-3 mb-3'}`}>
            <div>
            <h4 className="pb-1" style={{borderBottom: '3px solid #00A02B', width: '30px', margin: '0 auto'}}>نبذة  </h4>
            <p>
            {nurseprofileid.about}
            </p>
            </div>
            <div>
            <h4 style={{borderBottom: '3px solid #00A02B', width: '40px', margin: '0 auto', paddingBottom: '2px'}}>المهارات</h4>
            <p>
            {nurseprofileid.skills}
            </p>
            </div>
          </div>
          <div style={{flexWrap:'nowrap', width: '50%' ,marginLeft: 'auto', marginRight:'auto'}} className={`${nurseProfile.row} ${'d-flex justify-content-between'}`}>
            <div  className={" col-lg-10"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bx bx-chevron-left"} />
                  <strong> رقم الهاتف :</strong> <span> {nurseprofileid.phoneNumber}</span>
                </li>
                {/* <li><i class="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li> */}
                {/* <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+123 456 7890</span></li> */}
                <li>
                  <i className={"bx bx-chevron-left"} />
                  <strong>   العنوان : </strong> <span> {`${nurseprofileid.region}`}</span>
                </li>
              </ul>
            </div>
            <div className={"col-lg-6"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bx bx-chevron-left"} />
                  <strong>سعر الشيفت : </strong> <span>{nurseprofileid.shiftPrice} ج.م </span>
                </li>
                {/* <li><i class="bi bi-chevron-right"></i> <strong>PhEmailone:</strong> <span>email@example.com</span> */}
                <li>
                  <i className={"bx bx-chevron-left"} />
                  <strong>سنوات الخبرة : </strong> <span>{nurseprofileid.experienceYear}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </Fade>

      <Fade top distance="10%" duration={1500}>
      <section
        id="resume"
        className={`${nurseProfile.resume} ${nurseProfile.container}`}
      >
        <div className={"container"}>
          <div className={nurseProfile.row}>
            <div  className={`${"col-lg-6"}${nurseProfile.section_title}${nurseProfile.resume} `}
              data-aos="fade-up" >
  
    
  <h3 style={{borderBottom: '3px solid #00A02B', width: '40px', marginBottom: '30px'}} className={nurseProfile.resume_title}>التعليم</h3> 
  {nurseprofileid.education?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}> 
      <h4>   
        {element.degree} 
      </h4>
      <h5>{moment(element.toDate).format('YYYY-MM-DD')}</h5>
      <p><em>{element.school}</em></p> 
      <p>{element.description}</p>
    </div>
  </div>

))}

<h3 style={{borderBottom: '3px solid #00A02B', width: '40px', marginBottom: '30px'}} className={nurseProfile.resume_title}>الخبرات</h3>
{nurseprofileid.experience?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}>
      <h4>
        {element.company}
      </h4>
      <h5>{moment(element.fromDate).format('YYYY-MM-DD')} / {moment(element.toDate).format('YYYY-MM-DD')}</h5>
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
      </Fade>
    </div>
    )}
    </>
  );
}

export default ShowNurseResume;
