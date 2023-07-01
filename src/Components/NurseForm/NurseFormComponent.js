import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import nurseformstyle from './NurseFormComponent.module.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


function OnService({Socket}) {

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    // console.log("socket.....",Socket);
    const loc = useLocation()
    // console.log(loc.state);
    
    const [indexx, setIndexx] = useState(0)
    function selectedDay(e) {
        let selected = loc.state.available.find(item => item.day === e.target.value )
        let index = loc.state.available.indexOf(selected)
        setIndexx(index)
    }


    let schema = Yup.object().shape({
        userName: Yup.string().min(3, "الإسم لا يقل عن 3 أحرف"),
        email: Yup.string().min(10, "يجب أن يزيد عن 10 أحرف").email("إيميل غير صحيح").required('من فضلك ادخل الإيميل'),
        userAge: Yup.number()
            .positive('يجب أن يكون العمر أكبر من الصفر')
            .integer('يجب أن يكون العمر عددًا صحيحًا')
            .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر')
            .max(60, 'يجب أن يكون العمر أقل من 60 عامًا'),
        userPhoneNumber: Yup.string().min(10, "يجب أن تكون أكبر من أو تساوي 10"),
        userAddress: Yup.string().min(6, "يجب أن تكون أكبر من أو تساوي 6"),
        userCity: Yup.string().required('من فضلك حدد المدينه'),
        patientStatus: Yup.string().max(100, 'يجب أن يكون أقل من 100'),
        type_of_services: Yup.array(),
        type: Yup.string().required('من فضلك حدد الجنس'),
        period: Yup.object({
            day: Yup.string().required('من فضلك حدد اليوم المطلوب'),
            times: Yup.string().required('من فضلك حدد الوقت المطلوب'),
        }).required('من فضلك حدد الموعد'),
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
            type_of_services: [""],
            type: "",
            period: {
                day: '',
                times: '',
            },
        },
        validationSchema: schema,


        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            // resetForm();
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const patientId = decoded.userid;
            // const nurseName = loc.state.name
            await axios.post(`http://localhost:3500/book/bookNurse/${loc.state._id}?patientId=${patientId}`, values, {
                headers: { authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    // console.log(res.data);
                    // console.log(form);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'تم تسجيل طلبك بنجاح',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    console.log("res.data ........",res.data);

                    // notifictionj
                    Socket.emit("sendNotificationBookNurse", {
                        patientName: res.data.data.userName,
                        NurseId: res.data.data.NurseId,
                        status: res.data.data.status,
                        times:res.data.data.period.times,
                        bookId: res.data.data._id
                      });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    })

    return (
        <>
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


                <div className={nurseformstyle.formGroup}>
                    <textarea
                        name="patientStatus"
                        id="patientStatus"
                        placeholder={"أدخل حالة المريض"}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.patientStatus && <small className={nurseformstyle.validatesmall} id="patientStatus" >{formik.errors.patientStatus}</small>}


                <p className={`${'mt-4'} ${nurseformstyle.day}`}>حدد اليوم</p>
                <div className={`${'mb-4'} ${nurseformstyle.formRadios}`}>
                    <div className={'d-flex'}>
                        <input id='sat' type="radio" name="period.day" value="السبت" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='sat' className={'me-1'} style={{ color: 'white' }} >السبت</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='sun' type="radio" name="period.day" value="الأحد" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='sun' className={'me-1'} style={{ color: 'white' }} >الأحد</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='mon' type="radio" name="period.day" value="الإثنين" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='mon' className={'me-1'} style={{ color: 'white' }} >الإثنين</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='tue' type="radio" name="period.day" value="الثلاثاء" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='tue' className={'me-1'} style={{ color: 'white' }} >الثلاثاء</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='wed' type="radio" name="period.day" value="الأربعاء" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='wed' className={'me-1'} style={{ color: 'white' }} >الأربعاء</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='thu' type="radio" name="period.day" value="الخميس" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='thu' className={'me-1'} style={{ color: 'white' }} >الخميس</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='fri' type="radio" name="period.day" value="الجمعه" onChange={formik.handleChange} onClick={selectedDay} />
                        <label for='fri' className={'me-1'} style={{ color: 'white' }} >الجمعه</label>
                    </div>
                </div>
                {formik.errors.period?.day && <small className={nurseformstyle.validatesmall} id="period.day">{formik.errors.period?.day}</small>}


                <div className={nurseformstyle.formGroup}>
                    <select className={nurseformstyle.options} {...formik.getFieldProps('period.times')} >
                        <option value="option">المواعيد المتاحه</option>
                        {
                            loc.state.available[indexx] != null ? loc.state.available[indexx].times.map((item, index) => {
                                return <option value={item} className={nurseformstyle.opt}>
                                    {item}</option>;
                            }
                            ): (() => {
                                return <option value='option' className={nurseformstyle.opt}>
                                    لايوجد مواعيد متاحه</option>;
                            })
                        }
                    </select>
                </div>
                {formik.errors.period?.times && <small className={nurseformstyle.validatesmall} id="period.times">{formik.errors.period?.times}</small>}


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
                                <input className={nurseformstyle.inputcheckbox} id="check-2" type="checkbox" name="type_of_services" value="العناية بالجروح " />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-2" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العناية بالجروح </span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-3" type="checkbox" name="type_of_services" value="رعاية ما بعد الجراحة" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-3" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>رعاية ما بعد الجراحة</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-4" type="checkbox" name="type_of_services" value="العلاج التنفسي" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-4" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العلاج التنفسي</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-5" type="checkbox" name="type_of_services" value="جلسة بخار أكسجين" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-5" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>جلسة بخار أكسجين</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-6" type="checkbox" name="type_of_services" value="تركيب قنية" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-6" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>تركيب قنية</span>
                    </div>
                </div>
                <div className={nurseformstyle.formGroup}>
                    <button type="submit" className={nurseformstyle.btn2} disabled={formik.isSubmitting}>
                        تسجيل الطلب
                    </button>
                </div>
            </form>
        </>
    )
}



function OnShift({Socket}) {
    const loc = useLocation()
    // console.log(loc.state);

    let schema = Yup.object().shape({
        userName: Yup.string().min(3, "الإسم لا يقل عن 3 أحرف"),
        email: Yup.string().min(10, "يجب أن يزيد عن 10 أحرف").email("إيميل غير صحيح").required('من فضلك ادخل الإيميل'),
        userAge: Yup.number()
            .positive('يجب أن يكون العمر أكبر من الصفر')
            .integer('يجب أن يكون العمر عددًا صحيحًا')
            .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر')
            .max(60, 'يجب أن يكون العمر أقل من 60 عامًا'),
        userPhoneNumber: Yup.string().min(10, "يجب أن تكون أكبر من أو تساوي 10"),
        userAddress: Yup.string().min(6, "يجب أن تكون أكبر من أو تساوي 6"),
        userCity: Yup.string().required('من فضلك حدد المدينه'),
        patientStatus: Yup.string().max(100, 'يجب أن يكون أقل من 100'),
        type_of_services: Yup.array(),
        type: Yup.string().required('من فضلك حدد الجنس'),
        period: Yup.object({
            day: Yup.string().required('من فضلك حدد اليوم المطلوب'),
            shift: Yup.string().required('من فضلك حدد الشيفت المطلوب'),
        }).required('من فضلك حدد الموعد'),
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
            type_of_services: [""],
            type: "",
            period: {
                day: '',
                shift: '',
            },
        },
        validationSchema: schema,


        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            // resetForm();
            resetForm();
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const patientId = decoded.userid;
            await axios.post(`http://localhost:3500/nurse/bookNurse/${loc.state._id}?patientId=${patientId}`, values, {
                headers: { authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    // console.log(res.data);
                    // console.log(form);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'تم تسجيل طلبك بنجاح',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    // console.log("res.data ........",res.data);

                    // // notifictionj
                    // Socket.emit("sendNotificationBookNurse", {
                    //     // postNameSender: res.data.patientName,
                    //     // patientId: res.data.patientId,
                    //     // postNurseName: lastComment.nurseName,
                    //     // nurseComment: lastComment.comment,
                    //     // postTitle:res.data.title,
                    //     // nurseImg: lastComment.nurseImg
                    //   });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    })
    return (
        <>
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

                <div className={nurseformstyle.formGroup}>
                    <textarea
                        name="patientStatus"
                        id="patientStatus"
                        placeholder={"أدخل حالة المريض"}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.patientStatus && <small className={nurseformstyle.validatesmall} id="patientStatus" >{formik.errors.patientStatus}</small>}

                <p className={`${'mt-4'} ${nurseformstyle.day}`}>حدد اليوم</p>
                <div className={`${'mb-4'} ${nurseformstyle.formRadios}`}>
                <div className={'d-flex'}>
                        <input id='sat' type="radio" name="period.day" value="السبت" onChange={formik.handleChange} />
                        <label for='sat' className={'me-1'} style={{ color: 'white' }} >السبت</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='sun' type="radio" name="period.day" value="الأحد" onChange={formik.handleChange} />
                        <label for='sun' className={'me-1'} style={{ color: 'white' }} >الأحد</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='mon' type="radio" name="period.day" value="الإثنين" onChange={formik.handleChange} />
                        <label for='mon' className={'me-1'} style={{ color: 'white' }} >الإثنين</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='tue' type="radio" name="period.day" value="الثلاثاء" onChange={formik.handleChange} />
                        <label for='tue' className={'me-1'} style={{ color: 'white' }} >الثلاثاء</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='wed' type="radio" name="period.day" value="الأربعاء" onChange={formik.handleChange} />
                        <label for='wed' className={'me-1'} style={{ color: 'white' }} >الأربعاء</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='thu' type="radio" name="period.day" value="الخميس" onChange={formik.handleChange} />
                        <label for='thu' className={'me-1'} style={{ color: 'white' }} >الخميس</label>
                    </div>

                    <div className={'d-flex'}>
                        <input id='fri' type="radio" name="period.day" value="الجمعه" onChange={formik.handleChange} />
                        <label for='fri' className={'me-1'} style={{ color: 'white' }} >الجمعه</label>
                    </div>
                </div>

                <p className={`${'mt-4'} ${nurseformstyle.day}`}>حدد الشيفت</p>
                <div className={`${'mb-4'} ${nurseformstyle.formShifts}`}>
                    <div className={'d-flex'}>
                        <input id='mor' type="radio" name="period.shift" value="morning" onChange={formik.handleChange} />
                        <label for='mor' className={'me-1'} style={{ color: 'white' }} >صباحاً</label>
                    </div>
                    <div className={'d-flex'}>
                        <input id='eve' type="radio" name="period.shift" value="evening" onChange={formik.handleChange} />
                        <label for='eve' className={'me-1'} style={{ color: 'white' }} >مساءً</label>
                    </div>
                </div>

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
                                <input className={nurseformstyle.inputcheckbox} id="check-2" type="checkbox" name="type_of_services" value="العناية بالجروح " />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-2" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العناية بالجروح </span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-3" type="checkbox" name="type_of_services" value="رعاية ما بعد الجراحة" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-3" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>رعاية ما بعد الجراحة</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-4" type="checkbox" name="type_of_services" value="العلاج التنفسي" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-4" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>العلاج التنفسي</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-5" type="checkbox" name="type_of_services" value="جلسة بخار أكسجين" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-5" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>جلسة بخار أكسجين</span>
                    </div>
                    <div className={"d-flex"}>
                        <div className={`${nurseformstyle.checkbox_wrapper_5} ${nurseformstyle.item}`}>
                            <div className={nurseformstyle.check}>
                                <input className={nurseformstyle.inputcheckbox} id="check-6" type="checkbox" name="type_of_services" value="تركيب قنية" />
                                <label className={nurseformstyle.labelcheckbox} htmlFor="check-6" />
                            </div>
                        </div>
                        <span className={`${nurseformstyle.item_content} ${"px-4"}`}>تركيب قنية</span>
                    </div>
                </div>
                <div className={nurseformstyle.formGroup}>
                    <button type="submit" className={nurseformstyle.btn2} disabled={formik.isSubmitting} >
                        تسجيل الطلب
                    </button>
                </div>
            </form>
        </>
    )
}



function NurseFormComponent({Socket}) {

    const [buttonClicked, setButtonClicked] = useState('service');

    return (
        <>
            <div className={`${nurseformstyle.container} ${nurseformstyle.imageBody}`}>
                <div className={nurseformstyle.form}>
                    <h2 className={nurseformstyle.sign}>اطلب  ممرض الآن</h2>
                    <div className={`${'mt-3'} ${nurseformstyle.buttonss}`}>
                        <button className={`${nurseformstyle.servButton} ${'w-50 my-3 py-3'}`} onClick={() => setButtonClicked('service')}
                            style={{
                                backgroundColor: buttonClicked === 'service' ? '#00A02B' : 'transparent',
                                color: 'white',
                                border: buttonClicked === 'service' ? 'none' : '2px solid #00A02B',
                            }}
                        >خدمه سريعه</button>
                        <button className={`${nurseformstyle.servButton} ${'w-50 my-3 py-3'}`} onClick={() => setButtonClicked('shift')}
                            style={{
                                backgroundColor: buttonClicked === 'shift' ? '#00A02B' : 'transparent',
                                color: 'white',
                                border: buttonClicked === 'shift' ? 'none' : '2px solid #00A02B',
                            }}
                        >خدمه خاصه</button>
                    </div>
                    {buttonClicked === 'service' && <OnService Socket={Socket}/>}
                    {buttonClicked === 'shift' && <OnShift Socket={Socket}/>}
                </div>
            </div>
        </>
    )
}

export default NurseFormComponent