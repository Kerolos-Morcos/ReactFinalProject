import React from 'react'
import feedBack from './feedback.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Feedback() {
    let schema = Yup.object().shape({
        name: Yup.string().min(3, "your name must be 3 characters at least").max(30,"your name must be less than 30 characters").required("required field"),
        email: Yup.string().email().required("required field").min(10,"your email must be at least 10 characters and contain @").max(30,"your email must be less than 30 characters"),
        message: Yup.string().max(300,).min(10,"your message must be at least 10 characters")
    })
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
        }
    })
    return (
        <div className={`${"d-flex flex-wrap py-5"} ${feedBack.ContactPage}`}>
            <figure className={"col-lg-6 col-md-10 col-sm-10 col-10"}>
                <div className={feedBack.main_img}></div>
            </figure>
            <section className={`${feedBack.contact__us} ${"col-12 col-lg-5 ps-lg-5 pe-lg-3"}`}>
                <div className={"container"}>
                    <h1 className={"mt-4 mb-5"}>تواصل معنا</h1>
                    <form action="" name="form">
                        <div className={"mb-5 mb-lg-4"}>
                            <p className={"mb-3"}>الإسم</p>
                            <input
                                type="text"
                                className={"w-100"}
                                placeholder="ادخل الإسم بالكامل"
                                name="name"
                                required=""
                            />
                        </div>
                        <div className={"mb-5 mb-lg-4"}>
                            <p className={"mb-3"}>الإيميل</p>
                            <input
                                type="email"
                                className={"w-100"}
                                placeholder="ادخل الإيميل الخاص"
                                name="email"
                                required=""
                            />
                        </div>
                        <div className={"mb-5 mb-lg-4"}>
                            <p className={"mb-2"}>رسالتك</p>
                            <textarea
                                className={"w-100"}
                                rows={4}
                                cols={40}
                                name="message"
                                required=""
                                defaultValue={""}
                                placeholder='ادخل رسالتك'
                            />
                        </div>
                        <div className={"mb-3"}>
                            <input type="checkbox" id="yes" name="agree" required className={'ms-2'} />
                            <label htmlFor="yes">
                                أنا أوافق على{" "}
                                <a href="s" className={`${feedBack.terms}`}>
                                    سياسة الخصوصية وفقاً للشروط والأحكام
                                </a>
                            </label>
                        </div>
                        <div className={'w-100 d-flex justify-content-center mt-5'}>
                            <input type="submit" value="إرسال" defaultValue="إرسال" className={`${feedBack.submit} ${"w-50"}`}/>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Feedback