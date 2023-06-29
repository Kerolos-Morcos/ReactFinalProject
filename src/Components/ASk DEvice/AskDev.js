// import React from "react";
// import { useFormik } from "formik";
// // import { object, string, number, date, InferType } from 'yup';
// import * as Yup from "yup";
// import deviceForm from "./AskkDev.module.css";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import {motion} from 'framer-motion'

// function AskDevice() {
//   let schema = Yup.object().shape({
//     userName: Yup.string().min(8, "الأسم لا يقل عن 8 أحرف"),
//     email: Yup.string()
//       .min(10, "يجب أن يزيد عن 14 حرف")
//       .email("أميل غير صحيح")
//       .required("أدخل الاميل"),
//     userAge: Yup.number()
//       .positive("يجب أن يكون العمر أكبر من الصفر")
//       .integer("يجب أن يكون العمر عددًا صحيحًا")
//       .min(18, "يجب أن يكون العمر 18 عامًا أو أكبر"),
//     userMobile: Yup.string().min(11, "يجب أن تكون أكبر من أو تساوي 10"),
//     Address: Yup.string().min(3, "يجب أن تدخل عنوانا مناسب"),
//     patientStatus: Yup.string().max(100, "يجب أن يكون أقل من 100"),
//     Region: Yup.string().required("الرجاء تحديد نوع العنوان"),
//     gender: Yup.string().required("الرجاء تحديد الجنس"),
//     startDate: Yup.string().required("يرجى تحديد تاريخ ووقت بدء الحجز"),
//     endDate: Yup.string().required("يرجى تحديد تاريخ ووقت نهاية الحجز"),
//     // numOfDevice: Yup.number().required("الرجاء تحديد عدد الاجهزة المطلوبة"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       email: "",
//       userAge: "",
//       userMobile: "",
//       Address: "",
//       patientStatus: "",
//       Region: "",
//       gender: "",
//       // numOfDevice: "",
//       startDate: "",
//       endDate: "",
//     },

//     validationSchema: schema,

//     onSubmit: (values) => {
//       console.log(values);
//       const token = localStorage.getItem("token");
//       const decoded = jwtDecode(token);
//       const patientId = decoded.userid;

//       axios
//         .post(
//           `http://localhost:3500/order/addOrder?patientId=${patientId}`,
//           values,{
//             headers: { authorization: `Bearer ${token}` },
//         }
//         )
//         .then((res) => {
//           console.log(res.data);
//           // console.log(form);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     },
//   });
//   console.log(formik.errors);

//   return (
//     <motion.div
//     initial={ {opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={ {opacity: 0 }}
//     variants={{duration: 0.2}}
//     transition={{yoyo: Infinity}}
// style={{overflow: 'hidden'}}
//     >
//       <div className={`${deviceForm.container} ${deviceForm.imageBody}`}>
//         <div className={deviceForm.form}>
//           <h2 className={deviceForm.sign}>أطلب جهاز طبي </h2>
//           <form
//             className={"signUp"}
//             action=""
//             method="get"
//             onSubmit={formik.handleSubmit}
//           >
//             <div className={`${deviceForm.formGroup} ${deviceForm.firstinput}`}>
//               <input
//                 type="text"
//                 id="userName"
//                 name="userName"
//                 placeholder="أسم المريض"
//                 autoComplete="off"
//                 className={deviceForm.input}
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.errors.userName && (
//               <small className={deviceForm.validatesmall} id="userName">
//                 {formik.errors.userName}
//               </small>
//             )}
//             <div className={deviceForm.formGroup}>
//               <input
//                 type="email"
//                 placeholder="أدخل الاميل"
//                 name="email"
//                 autoComplete="off"
//                 className={deviceForm.input}
//                 {...formik.getFieldProps("email")}
//               />
//             </div>
//             {formik.errors.email && formik.touched.email && (
//               <small className={deviceForm.validatesmall} id="email">
//                 {formik.errors.email}
//               </small>
//             )}

//             <div className={deviceForm.formGroup}>
//               <input
//                 type="number"
//                 id="userAge"
//                 min={18}
//                 max={60}
//                 name="userAge"
//                 placeholder="أدخل العمر"
//                 autoComplete="off"
//                 className={deviceForm.input}
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.errors.userAge && formik.touched.userAge && (
//               <small className={deviceForm.validatesmall} id="userAge">
//                 {formik.errors.userAge}
//               </small>
//             )}

//             <div className={deviceForm.formGroup}>
//               <input
//                 type="text"
//                 id="userMobile"
//                 name="userMobile"
//                 placeholder="رقم التليفون"
//                 autoComplete="off"
//                 className={deviceForm.input}
//                 onChange={formik.handleChange}
//                 // value={values.userMobile}
//               />
//             </div>
//             {formik.errors.userMobile && (
//               <small className={deviceForm.validatesmall} id="userMobile">
//                 {formik.errors.userMobile}
//               </small>
//             )}

//             <div className={deviceForm.formGroup}>
//               <select
//                 required=""
//                 id="Region"
//                 className={"input-field"}
//                 name="Region"
//                 placeholder="المنطقة"
//                 onChange={formik.handleChange}
//               >
//                 <option hidden="" value="">
//                   أدخل المنطقة
//                 </option>
//                 <option className={deviceForm.option} value="اسوان">
//                   اسوان
//                 </option>
//                 <option className={deviceForm.option} value="السيل">
//                   السيل
//                 </option>
//                 <option className={deviceForm.option} value="كورنيش">
//                   كورنيش
//                 </option>
//               </select>
//             </div>
//             {formik.touched.Region && formik.errors.Region && (
//               <small className={deviceForm.validatesmall} id="Region">
//                 {formik.errors.Region}
//               </small>
//             )}
//             <div className={deviceForm.formGroup}>
//               <input
//                 type="text"
//                 id="Address"
//                 name="Address"
//                 className={deviceForm.input}
//                 placeholder="العنوان بالتفاصيل"
//                 autoComplete="off"
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.errors.Address && (
//               <small className={deviceForm.validatesmall} id="Address">
//                 {formik.errors.Address}
//               </small>
//             )}

//             <div className={deviceForm.formGroup}>
//               <select
//                 required=""
//                 id="type"
//                 className={"input-field"}
//                 name="gender"
//                 placeholder="النوع"
//                 onChange={formik.handleChange}
//               >
//                 <option hidden="" value="النوع">
//                   النوع
//                 </option>
//                 <option className={deviceForm.option} value="ذكر">
//                   ذكر
//                 </option>
//                 <option className={deviceForm.option} value="أنثي">
//                   أنثي
//                 </option>
//               </select>
//             </div>
//             {formik.touched.gender && formik.errors.gender && (
//               <small className={deviceForm.validatesmall} id="gender">
//                 {formik.errors.gender}
//               </small>
//             )}

//             <div className={`${"text-white"} ${deviceForm.formGroup}`}>
//               <input
//                 className={deviceForm.startdate}
//                 title="تاريخ بداية التأجير"
//                 type="datetime-local"
//                 name="startDate"
//                 placeholder="تاريخ بداية التأجير"
//                 autoComplete="off"
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.touched.startDate && formik.errors.startDate && (
//               <small className={deviceForm.validatesmall} id="startDate">
//                 {formik.errors.startDate}
//               </small>
//             )}

//             <div className={`${"text-white"} ${deviceForm.formGroup}`}>
//               <input
//                 className={deviceForm.enddate}
//                 title="تاريخ نهاية التأجير  "
//                 type="datetime-local"
//                 name="endDate"
//                 placeholder="تاريخ نهاية التأجير  "
//                 autoComplete="off"
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.touched.endDate && formik.errors.endDate && (
//               <small className={deviceForm.validatesmall} id="endDate">
//                 {formik.errors.endDate}
//               </small>
//             )}

//             {/* <div className={`${"text-white"} ${deviceForm.formGroup}`}>
//               <input
//                 className={deviceForm.enddate}
//                 type="number"
//                 name="numOfDevice"
//                 placeholder="عدد الاجهزة"
//                 autoComplete="off"
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.touched.endDate && formik.errors.endDate && (
//               <small className={deviceForm.validatesmall} id="endDate">
//                 {formik.errors.endDate}
//               </small>
//             )} */}

//             <div className={deviceForm.formGroup}>
//               <textarea
//                 name="patientStatus"
//                 id="patientStatus"
//                 placeholder={"أدخل حالة المريض"}
//                 onChange={formik.handleChange}
//               />
//             </div>
//             {formik.errors.patientStatus && (
//               <small className={deviceForm.validatesmall} id="patientStatus">
//                 {formik.errors.patientStatus}
//               </small>
//             )}

//             <div className={deviceForm.formGroup}>
//               <button type="submit" className={deviceForm.btn2}>
//                 تسجبل الطلب
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default AskDevice;


import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// import { object, string, number, date, InferType } from 'yup';
import * as Yup from "yup";
import deviceForm from "./AskkDev.module.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link, NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade'

function AskDevice() {
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    userName: Yup.string().min(8, "الاسم لا يقل عن 8 أحرف"),
    email: Yup.string()
      .min(10, "يجب أن يزيد عن 14 حرف")
      .email("بريد إالكتروني غير صالح")
      .required("ادخل البريد الإلكتروني"),
    userAge: Yup.number()
      .positive("يجب أن يكون العمر أكبر من الصفر")
      .integer("يجب أن يكون العمر عددًا صحيحًا")
      .min(18, "يجب أن يكون العمر 18 عامًا أو أكبر"),
    userMobile: Yup.string().min(11, "يجب أن تكون أكبر من أو تساوي 10"),
    Address: Yup.string().min(3, "يجب أن تدخل عنوانًا مناسبًا"),
    // patientStatus: Yup.string().max(100, "يجب أن يكون أقل من 100"),
    Region: Yup.string().required("الرجاء تحديد نوع العنوان"),
    gender: Yup.string().required("الرجاء تحديد الجنس"),
    startDate: Yup.string().required("يرجى تحديد تاريخ ووقت بدء الحجز"),
    endDate: Yup.string().required("يرجى تحديد تاريخ ووقت نهاية الحجز"),
    // numOfDevice: Yup.number().required("الرجاء تحديد عدد الاجهزة المطلوبة"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      userAge: "",
      userMobile: "",
      Address: "",
      // patientStatus: "",
      Region: "",
      gender: "",
      // numOfDevice: "",
      startDate: "",
      endDate: "",
    },

    validationSchema: schema,

    onSubmit: (values) => {
      console.log(values);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;

      axios
        .post(
          `http://localhost:3500/order/addOrder?patientId=${patientId}`,
          values,{
            headers: { authorization: `Bearer ${token}` },
        }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            navigate('/check')
            }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  
// const handleSubmit = (event) => {
//   event.preventDefault(); // Prevent the form from submitting automatically
//   if (formik.isValid) {
//     formik.submitForm();
//     navigate('/check')
//     // event?.preventDefault(); // Prevent the form from submitting automatically
//   }
// };
//   console.log(formik.errors);

  return (
    <Fade top distance="10%" duration={1500}>
      <div className={`${deviceForm.container} ${deviceForm.imageBody}`}>
        <div className={deviceForm.form}>
          <h2 className={deviceForm.sign}>أطلب جهاز طبي </h2>
          <form
          onSubmit={formik.handleSubmit}
            className={"signUp"}
            // // action=""
            // method="get"
            // onSubmit={formik.handleSubmit}
          >
            <div className={`${deviceForm.formGroup} ${deviceForm.firstinput}`}>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="أسم المريض"
                autoComplete="off"
                className={deviceForm.input}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.userName && (
              <small className={deviceForm.validatesmall} id="userName">
                {formik.errors.userName}
              </small>
            )}
            <div className={deviceForm.formGroup}>
              <input
                type="email"
                placeholder="أدخل الاميل"
                name="email"
                autoComplete="off"
                className={deviceForm.input}
                {...formik.getFieldProps("email")}
          
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <small className={deviceForm.validatesmall} id="email">
                {formik.errors.email}
              </small>
            )}

            <div className={deviceForm.formGroup}>
              <input
                type="number"
                id="userAge"
                min={18}
                max={60}
                name="userAge"
                placeholder="أدخل العمر"
                autoComplete="off"
                className={deviceForm.input}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.userAge && formik.touched.userAge && (
              <small className={deviceForm.validatesmall} id="userAge">
                {formik.errors.userAge}
              </small>
            )}

            <div className={deviceForm.formGroup}>
              <input
                type="text"
                id="userMobile"
                name="userMobile"
                placeholder="رقم التليفون"
                autoComplete="off"
                className={deviceForm.input}
                onChange={formik.handleChange}
                // value={values.userMobile}
              />
            </div>
            {formik.errors.userMobile && (
              <small className={deviceForm.validatesmall} id="userMobile">
                {formik.errors.userMobile}
              </small>
            )}

            <div className={deviceForm.formGroup}>
              <select
                required=""
                id="Region"
                className={"input-field"}
                name="Region"
                placeholder="المنطقة"
                onChange={formik.handleChange}
              >
                <option hidden="" value="">
                  أدخل المنطقة
                </option>
                <option className={deviceForm.option} value="اسوان">
                  اسوان
                </option>
                <option className={deviceForm.option} value="السيل">
                  السيل
                </option>
                <option className={deviceForm.option} value="كورنيش">
                  كورنيش
                </option>
              </select>
            </div>
            {formik.touched.Region && formik.errors.Region && (
              <small className={deviceForm.validatesmall} id="Region">
                {formik.errors.Region}
              </small>
            )}
            <div className={deviceForm.formGroup}>
              <input
                type="text"
                id="Address"
                name="Address"
                className={deviceForm.input}
                placeholder="العنوان بالتفاصيل"
                autoComplete="off"
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.Address && (
              <small className={deviceForm.validatesmall} id="Address">
                {formik.errors.Address}
              </small>
            )}

            <div className={deviceForm.formGroup}>
              <select
                required=""
                id="type"
                className={"input-field"}
                name="gender"
                placeholder="النوع"
                onChange={formik.handleChange}
              >
                <option hidden="" value="النوع">
                  النوع
                </option>
                <option className={deviceForm.option} value="ذكر">
                  ذكر
                </option>
                <option className={deviceForm.option} value="أنثي">
                  أنثي
                </option>
              </select>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <small className={deviceForm.validatesmall} id="gender">
                {formik.errors.gender}
              </small>
            )}

            <div className={`${"text-white"} ${deviceForm.formGroup}`}>
              <input
                className={deviceForm.startdate}
                title="تاريخ بداية التأجير"
                type="date"
                name="startDate"
                placeholder="تاريخ بداية التأجير"
                autoComplete="off"
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.startDate && formik.errors.startDate && (
              <small className={deviceForm.validatesmall} id="startDate">
                {formik.errors.startDate}
              </small>
            )}

            <div className={`${"text-white"} ${deviceForm.formGroup}`}>
              <input
                className={deviceForm.enddate}
                title="تاريخ نهاية التأجير  "
                type="date"
                name="endDate"
                placeholder="تاريخ نهاية التأجير  "
                autoComplete="off"
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <small className={deviceForm.validatesmall} id="endDate">
                {formik.errors.endDate}
              </small>
            )}

            {/* <div className={`${"text-white"} ${deviceForm.formGroup}`}>
              <input
                className={deviceForm.enddate}
                type="number"
                name="numOfDevice"
                placeholder="عدد الاجهزة"
                autoComplete="off"
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <small className={deviceForm.validatesmall} id="endDate">
                {formik.errors.endDate}
              </small>
            )} */}

            {/* <div className={deviceForm.formGroup}>
              <textarea
                name="patientStatus"
                id="patientStatus"
                placeholder={"أدخل حالة المريض"}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.patientStatus && (
              <small className={deviceForm.validatesmall} id="patientStatus">
                {formik.errors.patientStatus}
              </small>
            )} */}
            <div className={deviceForm.formGroup}>
              
            {formik.isValid ? (
              <div  className={deviceForm.Navlink} >
                <button className={deviceForm.btn2} disabled={!formik.isValid}>
                  تسجيل الطلب
                </button>
              </div>
            ) : null}
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}

export default AskDevice;