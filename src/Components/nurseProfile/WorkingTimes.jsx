import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import work from './WorkingTimes.module.css'
import Swal from 'sweetalert2'




function WorkingTimes() {
    let schema = Yup.object().shape({
        available: Yup.object({
            day: Yup.string().required("من فضلك حدد اليوم"),
            times: Yup.array().required("من فضلك حدد المواعيد")
        }).required()
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <a variant="primary" onClick={handleShow}>
                أضف مواعيدك
            </a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ direction: "rtl" }}>
                    <Modal.Title className={"ps-5"}> أضف المواعيد </Modal.Title>
                </Modal.Header>

                <Formik
                    validationSchema={schema}
                    initialValues={{
                        available: {
                            day: '',
                            times: [],
                        }
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        resetForm();

                        // const token = localStorage.getItem("token");
                        // const decoded = jwtDecode(token);
                        // console.log(decoded);
                        // const id = decoded.userid;
                        const token = localStorage.getItem("token");
                        const decoded = jwtDecode(token);
                        const patientId = decoded.userid;
                        // console.log(patientId);
                        axios.put(
                            `http://localhost:3500/nurse/editDates?patientId=${patientId}`,
                            {
                                available: values.available,
                            }
                        )
                            .then((res) => {
                                console.log(res.data);
                                handleClose();
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: 'تم تسجيل مواعيدك بنجاح',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }}
                >

                    {(formik) => (
                        <Form method='post' style={{ direction: "rtl" }} onSubmit={(e) => {
                            e.preventDefault()
                            formik.handleSubmit();
                        }}>
                            <Modal.Body>
                                <div className={work.options} >
                                    <select {...formik.getFieldProps('available.day')}>
                                        <option value="option"> حدد اليوم </option>
                                        <option value="السبت"> السبت </option>
                                        <option value="الأحد"> الأحد </option>
                                        <option value="الإثنين"> الإثنين </option>
                                        <option value="الثلاثاء"> الثلاثاء </option>
                                        <option value="الأربعاء"> الأربعاء </option>
                                        <option value="الخميس"> الخميس </option>
                                        <option value="الجمعه"> الجمعه </option>
                                    </select>
                                </div>

                                <div className={`${work.checks} ${"d-flex flex-wrap"}`}>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a1" type="checkbox" name="available.times" value="1 am - 2 am" onChange={formik.handleChange} />
                                        <label htmlFor="a1" className={'ms-1'} >1 am - 2 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a2" type="checkbox" name="available.times" value="2 am - 3 am" onChange={formik.handleChange} />
                                        <label htmlFor="a2" className={'ms-1'} >2 am - 3 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a3" type="checkbox" name="available.times" value="3 am - 4 am" onChange={formik.handleChange} />
                                        <label htmlFor="a3" className={'ms-1'} >3 am - 4 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a4" type="checkbox" name="available.times" value="4 am - 5 am" onChange={formik.handleChange} />
                                        <label htmlFor="a4" className={'ms-1'} >4 am - 5 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a5" type="checkbox" name="available.times" value="5 am - 6 am" onChange={formik.handleChange} />
                                        <label htmlFor="a5" className={'ms-1'} >5 am - 6 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a6" type="checkbox" name="available.times" value="6 am - 7 am" onChange={formik.handleChange} />
                                        <label htmlFor="a6" className={'ms-1'} >6 am - 7 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a7" type="checkbox" name="available.times" value="7 am - 8 am" onChange={formik.handleChange} />
                                        <label htmlFor="a7" className={'ms-1'} >7 am - 8 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a8" type="checkbox" name="available.times" value="8 am - 9 am" onChange={formik.handleChange} />
                                        <label htmlFor="a8" className={'ms-1'} >8 am - 9 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a9" type="checkbox" name="available.times" value="9 am - 10 am" onChange={formik.handleChange} />
                                        <label htmlFor="a9" className={'ms-1'} >9 am - 10 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a10" type="checkbox" name="available.times" value="10 am - 11 am" onChange={formik.handleChange} />
                                        <label htmlFor="a10" className={'ms-1'} >10 am - 11 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a11" type="checkbox" name="available.times" value="11 am - 12 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a11" className={'ms-1'} >11 am - 12 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a12" type="checkbox" name="available.times" value="1 am - 2 am" onChange={formik.handleChange} />
                                        <label htmlFor="a12" className={'ms-1'} >12 pm - 1 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a13" type="checkbox" name="available.times" value="1 am - 2 am" onChange={formik.handleChange} />
                                        <label htmlFor="a13" className={'ms-1'} >1 pm - 2 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a14" type="checkbox" name="available.times" value="2 pm - 3 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a14" className={'ms-1'} >2 pm - 3 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a15" type="checkbox" name="available.times" value="3 pm - 4 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a15" className={'ms-1'} >3 pm - 4 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a16" type="checkbox" name="available.times" value="4 pm - 5 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a16" className={'ms-1'} >4 pm - 5 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a17" type="checkbox" name="available.times" value="5 pm - 6 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a17" className={'ms-1'} >5 pm - 6 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a18" type="checkbox" name="available.times" value="6 pm - 7 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a18" className={'ms-1'} >6 pm - 7 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a19" type="checkbox" name="available.times" value="7 pm - 8 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a19" className={'ms-1'} >7 pm - 8 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a20" type="checkbox" name="available.times" value="8 pm - 9 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a20" className={'ms-1'} >8 pm - 9 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a21" type="checkbox" name="available.times" value="9 pm - 10 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a21" className={'ms-1'} >9 pm - 10 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a22" type="checkbox" name="available.times" value="10 pm - 11 pm" onChange={formik.handleChange} />
                                        <label htmlFor="a22" className={'ms-1'} >10 pm - 11 pm</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a23" type="checkbox" name="available.times" value="11 pm - 12  pm" onChange={formik.handleChange} />
                                        <label htmlFor="a23" className={'ms-1'} >11 pm - 12 am</label>
                                    </div>
                                    <div className={'col-4 mb-2'} >
                                        <input id="a24" type="checkbox" name="available.times" value="11 pm - 12  pm" onChange={formik.handleChange} />
                                        <label htmlFor="a24" className={'ms-1'} >12 am - 1 am</label>
                                    </div>
                                </div>
                                {formik.errors.available && formik.errors.available.day && formik.errors.available.times && <div>fsudhikld</div>}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button style={{ backgroundColor: "white", color: "#041858", borderColor: '#041858', border: '1px solid' }} variant="secondary" onClick={handleClose}>
                                    إلغاء
                                </Button>
                                <Button
                                    style={{ backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border: '1px solid' }}
                                    variant="primary"
                                    className={"btn m-3"}
                                    type="submit"
                                >
                                    حفظ
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik >
            </Modal>
        </>
    )
}

export default WorkingTimes