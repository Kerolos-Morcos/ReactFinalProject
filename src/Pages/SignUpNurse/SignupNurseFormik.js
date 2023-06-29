import '/node_modules/bootstrap/dist/js/bootstrap.min'
import React from "react";
import styleSignNurse from '../../Components/SignUp/nurse_signup.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { Helmet } from "react-helmet";
import bgImg from '../../assets/images/Patients-PNG-HD.png';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from 'framer-motion'


function SignupNurseFormik() {
  const navigate = useNavigate();
    let schema = Yup.object().shape({
      name: Yup.string().required("الاسم بالكامل مطلوب"),
      email: Yup.string().email("Invalid email").required("البريد الإلكتروني مطلوب"),
      phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
      password: Yup.string()
        .min(8, "كلمة السر يجب ان تحتوي علي 8 احرف علي الأقل")
        .required("كلمة السر مطلوبة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "الحقول يجب ان تكون متطابقة")
        .required("تأكيد كلمة السر مطلوبة"),
        age: Yup.number().required("السن مطلوب"),
      gender: Yup.string().required("النوع مطلوب"),
      region: Yup.string().required("المنطقة السكنية مطلوبة"),
      address: Yup.string().required("العنوان مطلوب"),
      nationalId: Yup.string().required("الرقم القومي مطلوب"),
      gradeCert: Yup.string().required("أصل شهادة التخرج مطلوب"), 
      licenseJob: Yup.string().required("رخصة مزاولة المهنة مطلوبة")
    });
  
    const formik = useFormik({
      initialValues: {
  
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          gender: "",
          region: "",
          address: "",
          age: "",
          nationalId: "",
          gradeCert: "",
          licenseJob:"",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
        let form = new FormData();
        form.append('name', values.name)
        form.append('email', values.email)
        form.append('phoneNumber', values.phoneNumber)
        form.append('password', values.password)
        form.append('age', values.age)
        form.append('gender', values.gender)
        form.append('region', values.region)
        form.append('address', values.address)
        form.append('nationalId', values.nationalId)
        form.append('gradeCert', values.gradeCert)
        form.append('licenseJob', values.licenseJob) 
        axios.post("http://localhost:3500/nurse/nurseReg", form).then((response) => { // removed commented headers
          console.log(response);
            console.log(response.data)
            if (response.data.success === true) {

              navigate('/Login')
              // alert(response.data.message)
              }
              else {
                console.log(response.data.message)
                navigate('/SignupNurse')
                }
                });
                }
        });
        const handleFileSelect = () => {
          toast.success('تم إرفاق الملف بنجاح', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { textAlign: "center" },
          });
        };
  console.log(formik.errors);

  return (
    <motion.div
    initial={ {opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={ {opacity: 0 }}
      variants={{duration: 0.2}}
      transition={{yoyo: {duration:1}}}

      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundColor: `white`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: '100vh',
      }}
      >
    <Helmet>
             {/* <style>
                {`
                 body {
                  background-image: url(${bgImg});
                    display: flex;
                    justify-content: center;
                  align-items: center;
                     padding: 10px;
 
 
                   background-repeat:no-repeat;
                         background-size: cover;
                  }
                `}
            </style> */}
          <style>
          {`
          body{
            transition: none;
          }
          ::placeholder{
            color: gray !important;
          }
          `}
        </style>
         </Helmet>

    <div dir="rtl" style={{marginTop: '-5px'}} className={styleSignNurse.container}>
      <div className={styleSignNurse.title}>
      <div class={styleSignNurse.title}>
         <h2>سجل كممرض </h2>
         </div>  
          </div>
          <div className={styleSignNurse.content}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styleSignNurse['user-details']}>
          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>الاسم بالكامل</span>
            <input
              type="text"
              name="name"
              placeholder="ادخل اسمك بالكامل"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({name:true}) 
                }} 
                style={{ border: formik.touched.name &&formik.errors.name ? 'solid 1px red' : '' }}
            />
             {formik.touched.name && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.name}
              </small>
            )}
          </div>
        
        <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>الايميل الالكترونى</span>
            <input
              type="text"
              name="email"
              placeholder="ادخل ايميلك"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({email:true}) 
                }} 
                style={{ border: formik.touched.email &&formik.errors.email ? 'solid 1px red' : '' }}
            />
            {formik.touched.email && (
              <small id="emailHelp" style={{ color: "red" , display: 'block'}}>
                {formik.errors.email}
              </small>
            )}
          </div>
          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>رقم الهاتف</span>
            <input
              type="text"
              name="phoneNumber"
              placeholder="ادخل رقم الهاتف"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({phoneNumber:true}) 
                }} 
                style={{ border: formik.touched.phoneNumber &&formik.errors.phoneNumber ? 'solid 1px red' : '' }}
            />
            {formik.touched.phoneNumber && (
              <small id="phoneHelp" style={{ color: "red" }}>
                {formik.errors.phoneNumber}
              </small>
            )}
          </div>
          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>الرقم السرى</span>
            <input
              type="password"
              name="password"
              placeholder="ادخل الرقم السرى"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({password:true}) 
                }} 
                style={{ border: formik.touched.password &&formik.errors.password ? 'solid 1px red' : '' }}
            />

            {formik.touched.password && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.password}
              </small>
            )}
          </div>
          <div className={styleSignNurse['input-box']}>
            <span className="details">تاكيد الرقم السرى</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="تاكيد الرقم السرى"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({confirmPassword:true}) 
                }} 
                style={{ border: formik.touched.confirmPassword &&formik.errors.confirmPassword ? 'solid 1px red' : '' }}
            />
            {formik.touched.confirmPassword && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </small>
            )}
          </div>

          <div className={styleSignNurse['input-box']}>
          <div className={styleSignNurse['gender-details']}>
            <span className={styleSignNurse['gender-title']}>النوع</span>
            <div className={styleSignNurse.category}>
              <label htmlFor="dot-1">
                <span className={styleSignNurse.gender} > انثى </span>
                <span className={styleSignNurse['dot one']} />
             <input type="radio" style={{ display: 'block' }} name="gender" value='female' id="dot-2" onChange={formik.handleChange} />
              </label>
                <span className={styleSignNurse["dot two"]} />
              <label htmlFor={styleSignNurse["dot-2"]}>
                <span className={styleSignNurse.gender }> ذكر </span>
            <input type="radio" name="gender"  style={{ display: 'block' }} value='male' id="dot-1" onChange={formik.handleChange} />
              </label>
              
            </div>
              {formik.touched.gender && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.gender}
              </small>
            )}
          </div>
          </div>

          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>العنوان</span>
            <input
              type="text"
              name="address"
              placeholder="ادخل عنوانك"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({address:true}) 
                }} 
                style={{ border: formik.touched.address &&formik.errors.address ? 'solid 1px red' : '' }}
            />
            {formik.touched.address && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.address}
              </small>
            )}
          </div>

          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>المنطقة</span>
            <input
              type="text"
              name="region"
              placeholder="ادخل منطقتك"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({region:true}) 
                }} 
                style={{ border: formik.touched.region &&formik.errors.region ? 'solid 1px red' : '' }}
            />
            {formik.touched.region && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.region}
              </small>
            )}
          </div>
          <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>السن</span>
            <input
              type="number"
              name="age"
              placeholder="ادخل سنك"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({age:true}) 
                }} 
                style={{ border: formik.touched.age &&formik.errors.age ? 'solid 1px red' : '' }}
            />
            {formik.touched.age && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.age}
              </small>
            )}
          </div>
         
            <div className={styleSignNurse['input-box']}>
            <span className={styleSignNurse.details}>الرقم القومى</span>
            <input
              type="number"
              name="nationalId"
              placeholder="ادخل الرقم القومى"
              onChange={formik.handleChange}
              onBlur={()=> 
                { 
                  formik.setTouched({nationalId:true}) 
                }} 
                style={{ border: formik.touched.nationalId &&formik.errors.nationalId ? 'solid 1px red' : '' }}
            />
            {formik.touched.nationalId && (
              <small id="emailHelp" style={{ color: "red" }}>
                {formik.errors.nationalId}
              </small>
            )}
            </div>

<div className={styleSignNurse.FlexingBTNS}>
 {/*  */}
 <div className={styleSignNurse["input-box item"]}>
    
    <label className={styleSignNurse['certbtn']} htmlFor="gradeCert"> ادخل شهادة التخرج </label>
      <input multiple id="gradeCert" name='gradeCert'  type="file" hidden 
           onChange={(event) => {
                    formik.setFieldValue("gradeCert", event.target.files[0]); handleFileSelect(event)}} className={styleSignNurse['form-control']
                     }  />
       {formik.touched.gradeCert && (
                <small id="emailHelp" style={{ color: "red", display: 'block' }}>
                  {formik.errors.gradeCert}
                </small>
              )}
              <ToastContainer/>
            </div>
{/*  */}

{/*  */}
            <div className={styleSignNurse["input-box item"]}>
  <label className={styleSignNurse["certbtn"]} for="license"> رخصة مزاولة المهنة </label>
    <input  multiple id="license" name='licenseJob' class={styleSignNurse["form-control"]} type="file" hidden 
  onChange={(event) => {
                    formik.setFieldValue("licenseJob", event.target.files[0]);
                    handleFileSelect(event)}}/>
     {formik.touched.licenseJob && (
              <small id="emailHelp" style={{ color: "red" , display: 'block' }}>
                {formik.errors.licenseJob}
              </small>
            )}
              <ToastContainer/>
          </div>
          {/*  */}
</div>
           
        </div>
          <div className={styleSignNurse["input-box"]}>
          <div className={styleSignNurse.button}>
          <button type="submit" value="Register">
             تسجيل
            </button>
          </div>
          </div>
      </form>
      </div>
      </div>
      
    </motion.div>
  );
}

export default SignupNurseFormik;
