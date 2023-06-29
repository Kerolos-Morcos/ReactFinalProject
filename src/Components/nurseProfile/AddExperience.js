import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getNurse } from "../../Redux/Slices/NurseProfileR";


const AddExperience = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();






  return (
    <>
      <style>
    {`
      ::placeholder{
        color: gray !important;
      }
    `}
  </style>
      <a variant="primary" onClick={handleShow}>
        اضف خبرات
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ direction: "rtl" }}>
          <Modal.Title className={"ps-5"}>اضف خبرات جديدة</Modal.Title>
        </Modal.Header>

        <Formik
         initialValues={{
          experience: {
            title: "",
            employmentType: "",
            company: "",
            location: "",
            fromDate: "",
            toDate: "",
            description: "",
          },
        }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          
            const token = localStorage.getItem("token");
            // const user = localStorage.getItem("user");
            const decoded = jwtDecode(token);
            console.log(decoded);
            const id = decoded.userid;            axios
              .post(
                `http://localhost:3500/nurse/addEducationAndExperience/${id}`,
                {
                  experience: values.experience,
                }
              )
              .then((response) => {
                dispatch(getNurse());
                console.log(response.data);
                handleClose();
              })
              .catch((error) => {
                console.log(error);
                // add error handling code here
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form style={{ direction: "rtl" }} onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              handleClose();
            }}>
              <Modal.Body>
                <Form.Group className={"mb-4"} controlId="title">
                  <Form.Label className={"mb-1"}>المسمي الوظيفي </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="مثال : اخصائي تمريض قسم الاطفال"
                    name="experience.title"
                    value={values.experience.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                 
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="employmentType">
                  <Form.Label className={"mb-1"} >نوع العمل   </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="دوام كلي او جزئي"
                    name="experience.employmentType"
                    value={values.experience.employmentType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                 
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="company">
                  <Form.Label className={"mb-1"} >اسم المستشفي </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="مستشفي أسوان الجامعي"
                    name="experience.company"
                    value={values.experience.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                 
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="location">
                  <Form.Label className={"mb-1"}>الموقع </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="أسوان"
                    name="experience.location"
                    value={values.experience.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
          
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="fromDate">
                  <Form.Label className={"mb-1"}>بداية العمل</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="يوم-شهر-سنة  (10-01-2018)"
                    name="experience.fromDate"
                    value={values.experience.fromDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="toDate">
                  <Form.Label className={"mb-1"}>نهاية العمل</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="يوم-شهر-سنة  (10-01-2020)"
                    name="experience.toDate"
                    value={values.experience.toDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
            
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="description">
                  <Form.Label className={"mb-1"}>نبذة عن دورك الوظيفي</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="experience.description"
                    rows={3}
                    value={values.experience.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }} variant="secondary" onClick={handleClose}>
                  إلغاء
                </Button>
                <Button
                style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                variant="primary"
                  className={"btn m-3"}
                  type="submit" disabled={isSubmitting}>
                  حفظ
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddExperience;
