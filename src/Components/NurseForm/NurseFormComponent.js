import React from 'react'
import { useFormik } from 'formik';
// import { object, string, number, date, InferType } from 'yup';
import * as Yup from 'yup';
import nurseformstyle from './NurseFormComponent.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NurseFormComponent() {

  const {id}  = useParams();

  const notify = () =>
    toast.success('! تمت تسجيل طلب الممرض  ', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom_toast",
      });


  // console.log(id);

  let schema = Yup.object().shape({
    userName: Yup.string().min(8, "الأسم لا يقل عن 8 أحرف"),
    email: Yup.string().min(10, "يجب أن يزيد عن 14 حرف").email("أميل غير صحيح").required("أدخل الاميل"),
    userAge: Yup.number()
      .positive('يجب أن يكون العمر أكبر من الصفر')
      .integer('يجب أن يكون العمر عددًا صحيحًا')
      .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر'),
    userPhoneNumber: Yup.string().min(10, "يجب أن تكون أكبر من أو تساوي 10"),
    userAddress: Yup.string().min(10, "يجب أن تكون أكبر من أو تساوي 10"),
    userCity: Yup.string().required( "الرجاء تحديد المدينة"),
    patientStatus: Yup.string().max(100, 'يجب أن يكون أقل من 100'),
    type_of_services: Yup.array().required('الرجاء تحديد نوع الخدمة'),
    type: Yup.string().required('الرجاء تحديد الجنس'),
    startDate: Yup.string().required('يرجى تحديد تاريخ ووقت بدء الحجز'),
    endDate: Yup.string().required('يرجى تحديد تاريخ ووقت نهاية الحجز'),
  })
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      userAge: "",
      userPhoneNumber: "",
      userAddress: "",
      userCity: "",
      patientStatus: "",
      type_of_services:[""],
      type: "",
      startDate: "",
      endDate: ""
    },
  
    validationSchema: schema,

    onSubmit: (values) => {
      console.log(values);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;
      axios.post(`http://localhost:3500/book/bookNurse/${id}?patientId=${patientId}`,values,{
        headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        // console.log(form);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });
  console.log(formik.errors);
  return (
    <>
    <div className={`${nurseformstyle.container} ${nurseformstyle.imageBody}`}>
      <div className={nurseformstyle.form}>
        <h2 className={nurseformstyle.sign}>أطلب  ممرض</h2>
        <form className={"signUp"} action="" method="get" onSubmit={formik.handleSubmit}>
          <div className={`${nurseformstyle.formGroup} ${nurseformstyle.firstinput}`}>
            <input
              type="text"
              id='userName'
              name="userName"
              placeholder="أسم المريض"
              autoComplete="off"
              className={nurseformstyle.input}
              onChange={formik.handleChange}
            />
          </div>
          {formik.errors.userName && <small className={nurseformstyle.validatesmall} id="userName">{formik.errors.userName}</small>}
          <div className={nurseformstyle.formGroup}>
            <input
              type="email"
              placeholder="أدخل الاميل"
              name="email"
              autoComplete="off"
              className={nurseformstyle.input}
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <small className={nurseformstyle.validatesmall} id="email">
              {formik.errors.email}
            </small>
          )}


          <div className={nurseformstyle.formGroup}>
            <input
              type="number"
              id="userAge"
              min={18}
              max={60}
              name='userAge'
              placeholder="أدخل العمر"
              autoComplete="off"
              className={nurseformstyle.input}
              onChange={formik.handleChange}
            />
          </div>
          {formik.errors.userAge && formik.touched.userAge && (
            <small className={nurseformstyle.validatesmall} id="userAge" >{formik.errors.userAge}</small>
          )}


          <div className={nurseformstyle.formGroup}>
            <input
              type="text"
              id="userPhoneNumber"
              name='userPhoneNumber'
              placeholder="رقم التليفون"
              autoComplete="off"
              className={nurseformstyle.input}
              onChange={formik.handleChange}
            // value={values.userPhoneNumber}
            />
          </div>
          {formik.errors.userPhoneNumber && <small className={nurseformstyle.validatesmall} id="userPhoneNumber" >{formik.errors.userPhoneNumber}</small>}


          <div className={nurseformstyle.formGroup}>
            <select
              required=""
              id="userCity"
              className={"input-field"}
              name="userCity"
              placeholder="المنطقة"
              onChange={formik.handleChange}
            >
              <option hidden="" value="">
                أدخل المنطقة
              </option>
              <option className={nurseformstyle.option} value="اسوان">اسوان</option>
              <option className={nurseformstyle.option} value="السيل">السيل</option>
              <option className={nurseformstyle.option} value="كورنيش">كورنيش</option>
            </select>
            
          </div>
          {formik.touched.userCity && formik.errors.userCity && (
              <small className={nurseformstyle.validatesmall} id="userCity" >{formik.errors.userCity}</small>
            )}
          <div className={nurseformstyle.formGroup}>
            <input
              type="text"
              id="userAddress"
              name='userAddress'
              className={nurseformstyle.input}
              placeholder="العنوان بالتفاصيل"
              autoComplete="off"
              onChange={formik.handleChange}
            />
          </div>
            {formik.errors.userAddress && <small className={nurseformstyle.validatesmall} id="userAddress" >{formik.errors.userAddress}</small>}


          <div className={nurseformstyle.formGroup}>
            <select
              required=""
              id="type"
              className={"input-field"}
              name="type"
              placeholder="النوع"
              onChange={formik.handleChange}
            >
              <option hidden="" value="النوع">
                النوع
              </option>
              <option className={nurseformstyle.option} value="ذكر">ذكر</option>
              <option className={nurseformstyle.option} value="أنثي">أنثي</option>
            </select>
            </div>
            {formik.touched.type && formik.errors.type && (
              <small className={nurseformstyle.validatesmall} id="type">{formik.errors.type}</small>
            )}

          <div className={`${"text-white"} ${nurseformstyle.formGroup}`}>
               <input
                className={nurseformstyle.startdate}
                title="start hire date"
                type="datetime-local"
                name="startDate"
                placeholder="hire start date"
                autoComplete="off"
                onChange={formik.handleChange}
              />
              </div>
            {formik.touched.startDate && formik.errors.startDate && (
              <small className={nurseformstyle.validatesmall} id="startDate">{formik.errors.startDate}</small>
            )}

              <div className={`${"text-white"} ${nurseformstyle.formGroup}`}>
              <input
                className={nurseformstyle.enddate}
                title="end hire date"
                type="datetime-local"
                name="endDate"
                placeholder="hire end date"
                autoComplete="off"
                onChange={formik.handleChange}
              />
              </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <small className={nurseformstyle.validatesmall} id="endDate" >{formik.errors.endDate}</small>
            )}
          <div className={nurseformstyle.formGroup}>
            <textarea
              name="patientStatus"
              id="patientStatus"
              placeholder={"أدخل حالة المريض"}
              onChange={formik.handleChange}
            />
          </div>
            {formik.errors.patientStatus && <small className={nurseformstyle.validatesmall} id="patientStatus" >{formik.errors.patientStatus}</small>}


          <div className={`${nurseformstyle.formGroup} ${nurseformstyle.items} ${"d-grid"}`} onChange={formik.handleChange}>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input className={nurseformstyle.inputcheckbox} id="check-1" type="checkbox" name="type_of_services" value="الحقن" />
                  <label className={nurseformstyle.labelcheckbox} htmlFor="check-1" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>الحقن</span>
            </div>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input className={nurseformstyle.inputcheckbox}  id="check-2" type="checkbox" name="type_of_services" value="العناية بالجروح " />
                  <label className={nurseformstyle.labelcheckbox} htmlFor="check-2" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العناية بالجروح </span>
            </div>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input className={nurseformstyle.inputcheckbox}  id="check-3" type="checkbox" name="type_of_services" value="رعاية ما بعد الجراحة" />
                  <label className={nurseformstyle.labelcheckbox} htmlFor="check-3" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>رعاية ما بعد الجراحة</span>
            </div>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input className={nurseformstyle.inputcheckbox}  id="check-4" type="checkbox" name="type_of_services" value="العلاج التنفسي"/>
                  <label className={nurseformstyle.labelcheckbox} htmlFor="check-4" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العلاج التنفسي</span>
            </div>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input  className={nurseformstyle.inputcheckbox}  id="check-5" type="checkbox" name="type_of_services" value="جلسة بخار أكسجين" />
                  <label  className={nurseformstyle.labelcheckbox} htmlFor="check-5" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>جلسة بخار أكسجين</span>
            </div>
            <div className={"d-flex"}>
              <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                <div className={nurseformstyle.check}>
                  <input  className={nurseformstyle.inputcheckbox}  id="check-6" type="checkbox" name="type_of_services" value="تركيب قنية" />
                  <label  className={nurseformstyle.labelcheckbox} htmlFor="check-6" />
                </div>
              </div>
              <span className={`${nurseformstyle.item_content} ${"px-4"}`}>تركيب قنية</span>
            </div>
          </div>
          {/* <div className={nurseformstyle.inputImage}>
            <label htmlFor="myFileInput" className={nurseformstyle.custom_file_upload}>
              <i className={"fa fa-cloud-upload"} /> تحميل صورة
            </label>
            <input  className={nurseformstyle.inputFile} type="file" id="myFileInput" multiple="" />
          </div> */}
          <div className={nurseformstyle.formGroup}>
            <button type="submit"  className={nurseformstyle.btn2}>
              تسجبل الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default NurseFormComponent