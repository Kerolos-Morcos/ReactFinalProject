import React from "react";
import nurseProfile from "./NurseResume.module.css";
import EditEducation from "./EditEducation";
import EditExperience from "./EditExperience";
import { getNurse } from "../../Redux/Slices/NurseProfileR";

import {useSelector,useDispatch} from 'react-redux'
import {deleteNurseExperience, deleteNurseEducation} from "../../Redux/Slices/NurseProfileR";
 
function NurseResume() {
 
  const dispatch = useDispatch();
  const nurse = useSelector(state => state.nurseProfileSlice);
  const info = nurse.nurseProfile;
  const handleDeleteExperience = (experienceId) => {
    if (window.confirm(`Are you sure you want to delete this experience?`)) {
      dispatch(
        deleteNurseExperience({
          nurse_id: info._id,
          experience_id: experienceId,
        })
      )
        .then(() => {
          dispatch(getNurse());
          console.log(`Experience deleted successfully!`);
        })
        .catch((error) => {
          console.log(`Error deleting experience: ${error}`);
        });
    }
  };
  const updateNurseEducationData = (updatedData) => {
    return {
      type: "nurse/updateNurseEducationData",
      payload: {
        education: updatedData.education,
      },
    };
  };
  const handleDeleteEducation = (educationIndex) => {
    if (window.confirm(`Are you sure you want to delete this education?`)) {
      dispatch(
        deleteNurseEducation({
          nurse_id: info._id,
          educationIndex: educationIndex,
        })
      )
        .then((updatedData) => {
          // Dispatch an action to update the education data in the Redux store
          dispatch(updateNurseEducationData(updatedData));
          dispatch(getNurse());
  
          console.log(`Education deleted successfully!`);
        })
        .catch((error) => {
          console.log(`Error deleting education: ${error}`);
        });
    }
  };

  return (
    <div style={{ direction: "rtl" }}>
      <section
        id="about"
        className={`${nurseProfile.about} ${nurseProfile.container} ${nurseProfile.uppersec}`}
      >
        <div>
          <div className={nurseProfile.section_title}>
            {/* <h2> {info.experience[0].title}  </h2> */}
            <h4>نبذة  </h4>
            <p>
            {info.about}
              {/* حاصلة على دبلوم الدولة في التمريض مع أكثر من 4 سنوات من الخبرة في
              المجال ، يبدو لي أن مؤسستكم هي الخيار الأمثل لبدء مسيرتي المهنية ،
              ولهذا السبب أقدم طلبي إليكم. أنا متحمس جدا وأمل أن أتمكن من
              الانضمام إلى فرقكم. */}
            </p>
            <h4>المهارات</h4>
            <p>
            {info.skills}
              {/* مراقبة و تقييم ومراقبة تطور الحالة الصحية للمرضى بالتعاون مع
              الطبيب المختص, دعم الأشخاص المصابين بأمراض مزمنة, رعاية المسنين
              متعددي الأمراض */}
            </p>
          </div>
          <div className={`${nurseProfile.row} row justify-content-between`}>
            <div className={"col-lg-6"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong> سعر الشفت :</strong> <span> {info.shiftPrice} ج.م</span>
                </li>
                {/* <li><i class="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li> */}
                {/* <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+123 456 7890</span></li> */}
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong>   العنوان : </strong> <span> {`${info.address} ${info.region}`}</span>
                </li>
              </ul>
            </div>
            <div className={"col-lg-6"}>
              <ul className={nurseProfile.ul}>
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  {/* <strong>الدرجة:</strong> <span>{info.education[0].degree}</span> */}
                </li>
                {/* <li><i class="bi bi-chevron-right"></i> <strong>PhEmailone:</strong> <span>email@example.com</span> */}
                <li>
                  <i className={"bi bi-chevron-right"} />{" "}
                  <strong>الحالة:</strong> <span>متوفر</span>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className={nurseProfile.row}>
            <div
              className={"col-lg-8 pt-4 pt-lg-0 content"}
              data-aos="fade-left"
            >
              <div className={nurseProfile.section_title}>
                <h2 className={nurseProfile.section_title}>
                </h2>
                <p className="  ">
                 
                </p>
              </div>
              
            </div>
          </div> */}
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
  {info.education?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}> 
      <h4>   
        {element.degree} 
       <EditEducation   index={index} nurse={element} />
       <i
          class="fa-solid fa-trash-can fa-lg p-3"
          onClick={() => handleDeleteEducation(element._id,info._id)}
        ></i>
      </h4>
      <h5>{element.toDate}</h5>
      <p><em>{element.school}</em></p> 
      <p>{element.description}</p>
    </div>
  </div>

))}
            {/* <div className={nurseProfile.Resume}>
              <div
                className={"col-lg-6 mx-auto"}
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <h3 className={nurseProfile.resume_title}> الخبرات </h3>
                <div className={nurseProfile.resume_item}>
                  <h4>
                    مستشفي اسوان الجامعي
                    <EditExperience />
                    <i class="fa-solid fa-trash-can fa-lg p-3"></i>
                  </h4>
                  <h5>2019 - الان</h5>
                  <p>
                    <em> اخصائي تمريض </em>
                  </p>
                  <ul className={nurseProfile.ul}>
                    <li>
                      كجزء من المهمات التي يتم القيام بها مراقبة الاحتياجات
                      الأساسية للمرضى وتنفيذ ما يتناسب مع حالة كل الشخص
                    </li>
                    <li>
                      الإلتزام وتطبيق للوصفات الطبية المقررة من قبل الأطباء
                      المعالجين أو الطبيب المسؤول عن الحالة
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
<h3 className={nurseProfile.resume_title}>الخبرات</h3>
{info.experience?.map((element, index) => (
  <div key={index}>
    <div className={nurseProfile.resume_item}>
      <h4>
        {element.company}
        <EditExperience index={index} nurse={element} />
        <i
          class="fa-solid fa-trash-can fa-lg p-3"
          onClick={() => handleDeleteExperience(element._id,info._id)}
        ></i>
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
  );
}

export default NurseResume;
