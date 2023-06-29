import React from 'react'
import styleSignNurse from '../../Components/SignUp/signup-patient.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

function SignupPatient() {
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    name: Yup.string().required('الاسم بالكامل مطلوب'),
    email: Yup.string().email('بريد إلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    phoneNumber: Yup.string().required('رقم الهاتف مطلوب'),
    password: Yup.string()
      .min(8, 'كلمة السر يجب ان تحتوي علي 8 احرف علي الأقل')
      .required('كلمة السر مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'الحقول يجب ان تكون متطابقة')
      .required('تأكيد كلمة السر مطلوبة'),
    gender: Yup.string().required("النوع مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    region: Yup.string().required("المنطقة السكنية مطلوبة"),
    age: Yup.number().required('السن مطلوب'),
    nationalId: Yup.string().required("الرقم القومي مطلوب"),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      address: '',
      region: '',
      age: '',
      nationalId: '',
      gender: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
     
      axios
        .post('http://localhost:3500/patient/patientReg', values)
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            navigate('/Login')
            // alert(res.data.message)
          } else {
           console.log(res.data.message)
           navigate('/SignupPatient')
          }
        })
    },
  })

  return (
    <motion.div
    initial={ {opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={ {opacity: 0 }}
      variants={{duration: 0.2}}
      transition={{yoyo: {duration:1}}}

      style={{
        backgroundImage: `url("https://designstripe-secure.imgix.net/scene-snapshots/06833868-f28d-4fb6-926a-44cfbe167500/1640021720669/default?auto=format&fit=clip&h=850&mark=%2Fwatermark.png&markfit=max&markalign=middle%2Ccenter&markw=1&markh=1&s=44d9a637a6aea08cf1585b6bf08a2368")`,
        backgroundColor: 'white', 
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
                  background-image: url("https://designstripe-secure.imgix.net/scene-snapshots/06833868-f28d-4fb6-926a-44cfbe167500/1640021720669/default?auto=format&fit=clip&h=850&mark=%2Fwatermark.png&markfit=max&markalign=middle%2Ccenter&markw=1&markh=1&s=44d9a637a6aea08cf1585b6bf08a2368");
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 10px;
                  background-repeat: no-repeat;
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
      <div dir="rtl" style={{marginTop: '-12px'}} className={styleSignNurse.container}>
        <div className={styleSignNurse.title}>
          <div className={styleSignNurse.title}>
            <h2>سجل كمريض </h2>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
                    {formik.errors.name}
                  </small>
                )}
              </div>

              <div className={styleSignNurse['input-box']}>
                <span className={styleSignNurse.details}>
                  الايميل الالكترونى
                </span>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
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
                  <small id="phoneHelp" style={{ color: 'red' }}>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
                    {formik.errors.confirmPassword}
                  </small>
                )}
              </div>
              <div className={styleSignNurse['input-box']}>
                <div className={styleSignNurse['gender-details']}>
                  <span className={styleSignNurse['gender-title']}>النوع</span>
                  <div className={styleSignNurse.category}>
                    <label htmlFor="dot-1">
                      <span className={styleSignNurse.gender}>ذكر</span>
                      <span className={styleSignNurse['dot one']} />
                      <input
                        type="radio"
                        name="gender"
                        id="dot-1"
                        onChange={formik.handleChange}
                        value="male"
                        
                      />
                    </label>
                    <label htmlFor={styleSignNurse['dot-2']}>
                      <span className={styleSignNurse.gender}>انثى</span>
                      <span className={styleSignNurse['dot two']} />
                      <input
                        type="radio"
                        name="gender"
                        id="dot-2"
                        onChange={formik.handleChange}
                        value="female"
                      />
                    </label>

                  </div>
                </div>
                    {formik.touched.gender && (
                      <small id="emailHelp" style={{ color: 'red' }}>
                        {formik.errors.gender}
                      </small>
                    )}
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
                  <small id="emailHelp" style={{ color: 'red' }}>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
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
                  <small id="emailHelp" style={{ color: 'red' }}>
                    {formik.errors.nationalId}
                  </small>
                )}
              </div>
            </div>
            <div className={styleSignNurse['input-box']}>
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
  )
}

export default SignupPatient
