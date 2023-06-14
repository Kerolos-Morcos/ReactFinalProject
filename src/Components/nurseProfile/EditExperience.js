import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {  useDispatch } from "react-redux";
import { getNurse,updateNurseExperience } from "../../Redux/Slices/NurseProfileR";
import { Formik, Field } from "formik";

function EditExperience(props) {
  let { nurseExperience, index } = props;
nurseExperience = props.nurse;
// console.log(nurseExperience);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customModalStyle = {
    // backgroundColor: "#f8f9fa",
    // border: "none",
    // color: "#000000",
  };

  const initialValues = {
    title: nurseExperience.title,
    company: nurseExperience.company,
    location:nurseExperience.location,
    fromDate: nurseExperience.fromDate,
    toDate: nurseExperience.toDate,
    description: nurseExperience.description,
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    const {
      title,
      company,
      location,
      fromDate,
      toDate,
      description,
    } = values;
    const experienceData = {
      title,
      company,  
      location,
      fromDate,
      toDate,
      description,
    };
   

    dispatch(updateNurseExperience({
      nurseExperience_id: nurseExperience._id,
      index,
      values
    })).then(() => {
      dispatch(getNurse());
      setSubmitting(false);
      handleClose();
    }).catch((error) => {
      console.log(error);
      setSubmitting(false);
    });
  };

  return (
    <>
      <a variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square fa-lg p-3"></i>
      </a>

      <Modal show={show} onHide={handleClose} style={customModalStyle}>
        <Modal.Header  style={{ direction: "rtl"}} closeButton={false}>

          <Modal.Title className={"s-5"}>   تعديل البيانات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors // Add errors here
            }) => (
              <Form style={{ direction: "rtl" }} onSubmit={handleSubmit}>
                <Form.Group className={"mb-4"}>
                  <Form.Label className={"mb-1"}>الدور الوظيفي </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    autoFocus
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.title ? (
                    <div className="error">{errors.title}</div>
                  ) : null}
                </Form.Group>
             
                <Form.Group className={"mb-4"}>
                  <Form.Label className={"mb-1"}>اسم المستشفى </Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.company ? (
                    <div className="error">{errors.company}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={"mb-4"}>
                  <Form.Label className={"mb-1"}> مكان العمل </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.location ? (
                    <div className="error">{errors.location}</div>
                  ) : null}
                </Form.Group>
             
                <Form.Group
                  className={"mb-4"}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className={"mb-1"}>بداية العمل</Form.Label>
                  <Form.Control
                    type="text"
                    name="fromDate"
                    value={values.fromDate}
                    onChange={handleChange}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.fromDate ? (
                    <div className="error">{errors.fromDate}</div>
                  ) : null}
                </Form.Group>
              
                <Form.Group
                  className={"mb-4"}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className={"mb-1"}>نهاية العمل</Form.Label>
                  <Form.Control
                    type="text"
                    name="toDate"
                    value={values.toDate}
                    onChange={handleChange}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.toDate ? (
                    <div className="error">{errors.toDate}</div>
                  ) : null}
                </Form.Group>

                
                <Form.Group
                  className={"mb-4"}
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className={"mb-1"}>وصف العمل</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {errors.description ? (
                    <div className="error">{errors.description}</div>
                  ) : null}
                </Form.Group>

                <div className={"d-flex gap-2 justify-content-end mt-5"}>
          <Button style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }} variant="secondary" onClick={handleClose}>
            إلغاء
          </Button>
                  <Button
                  style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    حفظ التغييرات
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditExperience;