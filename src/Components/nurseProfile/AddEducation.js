import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getNurse } from "../../Redux/Slices/NurseProfileR";


function AddEducation() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
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
        اضف تعليما
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ direction: "rtl" }}>
          <Modal.Title className={"ps-5"}> اضف تعليما </Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            education: {
              degree: "",
              school: "",
              fieldOfStudy: "",
              toDate: "",
              description: "",
            },
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            console.log(decoded);
            const id = decoded.userid;
            // const id = "647d0159411e1edad4d902c8";

            axios
              .post(
                `http://localhost:3500/nurse/addEducationAndExperience/${id}`,
                {
                  education: values.education,
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
            <Form
              style={{ direction: "rtl" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                handleClose();
              }}
            >
              <Modal.Body>
                <Form.Group className={"mb-4"} controlId="degree">
                  <Form.Label className={"mb-1"}>الدرجة </Form.Label>
                  <Field
                    type="text"
                    name="education.degree"
                    placeholder="بكالوريوس / ماجيستير"
                    autoFocus
                    className={"form-control"}
                    value={values.education.degree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="school">
                  <Form.Label className={"mb-1"}>اسم الجامعة </Form.Label>
                  <Field
                    type="text"
                    name="education.school"
                    placeholder="اسم الجامعة"
                    className={"form-control"}
                    value={values.education.school}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="fieldOfStudy">
                  <Form.Label className={"mb-1"}>
                    {" "}
                    التخصص{" "}
                  </Form.Label>
                  <Field
                    type="text"
                    name="education.fieldOfStudy"
                    placeholder="التخصص "
                    className={"form-control"}
                    value={values.education.fieldOfStudy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="toDate">
                  <Form.Label className={"mb-1"}>
                    {" "}
                    عام الحصول على المؤهل{" "}
                  </Form.Label>
                  <Field
                    type="text"
                    name="education.toDate"
                    placeholder="يوم-شهر-سنة  (10-01-2020)"
                    className={"form-control"}
                    value={values.education.toDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className={"mb-4"} controlId="description">
                  <Form.Label className={"mb-1"}>نبذة عن الدراسة </Form.Label>
                  <Field
                    as="textarea"
                    name="education.description"
                    rows={3}
                    placeholder="نبذة عن الدراسة"
                    className={"form-control"}
                    value={values.education. description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button className="secondbtn" style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }} variant="secondary" onClick={handleClose}>
                  إغلاق
                </Button>

                <Button
                style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                  variant="primary"
                  className={"btn m-3"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  حفظ
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AddEducation;
