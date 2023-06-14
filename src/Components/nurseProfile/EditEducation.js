import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { getNurse,updateNurseEducation } from "../../Redux/Slices/NurseProfileR";

function EditEducation(props) {
  // console.log(props.nurse.degree)
  let { nurseEducation, index } = props;
  nurseEducation= props.nurse;
// console.log(nurseEducation._id);
  const dispatch = useDispatch();
let eduID=nurseEducation._id
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Submit the updated education data to the server
  const handleSubmit = (values, { setSubmitting }) => {
  // console.log(values);

    // const { degree, fieldOfStudy, school, toDate, description } = values;
    // const educationData = { degree, fieldOfStudy, school, toDate, description };
    dispatch(updateNurseEducation({
      nurseEducation_id: nurseEducation._id,
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ direction: "rtl" }}>
          <Modal.Title className={"ps-5"}> تعديل البيانات </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              degree: nurseEducation.degree,
              fieldOfStudy: nurseEducation.fieldOfStudy,
              school: nurseEducation.school,
              toDate: nurseEducation.toDate,
              description: nurseEducation.description,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form style={{ direction: "rtl" }}>
                <Field type="text" name="degree">
                  {({ field: { value, onChange } }) => (
                    <Form.Group className={"mb-4"} controlId="degree">
                      <Form.Label className={"mb-1"}>الدرجة</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        autoFocus
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </Form.Group>
                  )}
                </Field>

                <Field type="text" name="fieldOfStudy">
                  {({ field: { value, onChange } }) => (
                    <Form.Group className={"mb-4"} controlId="fieldOfStudy">
                      <Form.Label className={"mb-1"}>التخصص</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </Form.Group>
                  )}
                </Field>

                <Field type="text" name="school">
                  {({ field: { value, onChange } }) => (
                    <Form.Group className={"mb-4"} controlId="school">
                      <Form.Label className={"mb-1"}>
                        الكلية / الجامعة
                      </Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        autoFocus
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </Form.Group>
                  )}
                </Field>

                <Field type="text" name="toDate">
                  {({ field: { value, onChange } }) => (
                    <Form.Group className={"mb-4"} controlId="toDate">
                      <Form.Label className={"mb-1"}>
                        عام الحصول علي المؤهل
                      </Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        autoFocus
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </Form.Group>
                  )}
                </Field>
                <Field as="textarea" rows={3} name="description">
                  {({ field: { value, onChange } }) => (
                    <Form.Group className={"mb-4"} controlId="description">
                      <Form.Label className={"mb-1"} style={{ direction: "rtl" }}>نبذة عما درست</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </Form.Group>
                  )}
                </Field>

                <Modal.Footer style={{ direction: "rtl" }}>
                  <Button style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }} variant="secondary" onClick={handleClose}>
                    إغلاق
                  </Button>
                  <Button
                  style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                    // Save the changes and show a confirmation message
                    onClick={() => {
                     
                      handleSubmit();
                    }}
                    className={"btn m-3"}
                    variant="primary"
                    disabled={isSubmitting}
                  >
                حفظ التغييرات
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditEducation;
