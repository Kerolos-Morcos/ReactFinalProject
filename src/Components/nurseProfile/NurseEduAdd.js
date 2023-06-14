import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";

const AddExperience = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a variant="primary" onClick={handleShow}>
        اضف خبرات
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ direction: "rtl" }}>
          <Modal.Title className={"ps-5"}>
            اضف خبرات جديدة
          </Modal.Title>
        </Modal.Header>

        <Formik
         initialValues={{
          title: "",
          company: "",
          location: "",
          fromDate: "",
          toDate: "",
          description: "",
          experience: {
            title: "",
            employmentType: "",
            company: "",
            location: "",
            fromDate: "",
            toDate: "",
            description: "",
          }
        }}ت
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "مطلوب هذا البيان ";
            }
            if (!values.company) {
              errors.company = "مطلوب هذا البيان ";
            }
            if (!values.location) {
              errors.location = "مطلوب هذا البيان ";
            }
            if (!values.fromDate) {
              errors.fromDate = "مطلوب هذا البيان ";
            }
            if (!values.toDate) {
              errors.toDate = "مطلوب هذا البيان ";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          
            let id = '646c9edfa9ec79dd02843b7e';
            axios.post(`http://localhost:3500/nurse/addEducationAndExperience/${id}`, {
              experience: values.experience
            })
              .then((response) => {
                console.log(response.data);
                handleClose();
              })
              .catch((error) => {
                console.log(error);
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
            <Form style={{ direction: "rtl" }} onSubmit={handleSubmit}>
              <Modal.Body>
              <Form.Group controlId="title">
  <Form.Label>المسمي الوظيفي </Form.Label>
  <Form.Control
    type="text"
    placeholder="اخصائي تمريض قسم الاطفال"
    name="experience.title"
    value={values.experience.title}
    onChange={handleChange}
    onBlur={handleBlur}
    style={{ direction: "rtl", textAlign: "right" }}
  />
  {errors.experience?.title && touched.experience?.title && (
    <div className="text-danger">{errors.experience.title}</div>
  )}
</Form.Group>

<Form.Group controlId="company">
  <Form.Label>اسم المستشفي </Form.Label>
  <Form.Control
    type="text"
    placeholder="مستشفي أسوان الجامعي"
    name="experience.company"
    value={values.experience.company}
    onChange={handleChange}
    onBlur={handleBlur}
    style={{ direction: "rtl", textAlign: "right" }}
  />
  {errors.experience?.company && touched.experience?.company && (
    <div className="text-danger">{errors.experience.company}</div>
  )}
</Form.Group>

<Form.Group controlId="location">
  <Form.Label>الموقع </Form.Label>
  <Form.Control
    type="text"
    placeholder="أسوان"
    name="experience.location"
    value={values.experience.location}
    onChange={handleChange}
    onBlur={handleBlur}
    style={{ direction: "rtl", textAlign: "right" }}
  />
  {errors.experience?.location && touched.experience?.location && (
    <div className="text-danger">{errors.experience.location}</div>
  )}
</Form.Group>

<Form.Group controlId="fromDate">
  <Form.Label>بداية العمل</Form.Label>
  <Form.Control
    type="text"
    placeholder="مايو 2021"
    name="experience.fromDate"
    value={values.experience.fromDate}
    onChange={handleChange}
    onBlur={handleBlur}
    style={{ direction: "rtl", textAlign: "right" }}
  />
  {errors.experience?.fromDate && touched.experience?.fromDate && (
    <div className="text-danger">{errors.experience.fromDate}</div>
  )}
</Form.Group>

<Form.Group controlId="toDate">
  <Form.Label>نهاية العمل</Form.Label>
  <Form.Control
    type="text"
    placeholder="الان او يونيو 2023"
    name="experience.toDate"
    value={values.experience.toDate}
    onChange={handleChange}
    onBlur={handleBlur}
    style={{ direction: "rtl", textAlign: "right" }}
  />
  {errors.experience?.toDate && touched.experience?.toDate && (
    <div className="text-danger">{errors.experience.toDate}</div>
  )}
</Form.Group>

<Form.Group controlId="description">
  <Form.Label>نبذة عن دورك الوظيفي</Form.Label>
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
                <Button variant="secondary" onClick={handleClose}>
                  إلغاء
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
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